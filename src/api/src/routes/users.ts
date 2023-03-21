import * as express from "express";
import {
	HTTP_STATUS,
	ERROR_MESSAGES,
	ROLES,
	MESSAGES,
	query
} from "../utils/constants";
import { User } from "../models/userModel";
import { SESSION_ID } from "../utils/constants";
import { ResumeError, throwResumeError } from "../utils/errorHelper";
import { filterProps, processQueryParam } from "../utils/helpers";
import {
	sendVerificationEmail,
	sendWelcomeEmail,
	sendForgetPasswordEmail
} from "../utils/email";
import Token from "../models/tokenModel";

export async function getListUser(req: express.Request, res: express.Response) {
	try {
		const options = processQueryParam(
			[query.limit, query.page, query.sort],
			req.query
		);
		if (options.sort) {
			options.sort = { createdAt: options.sort };
		}
		const users = await User.aggregatePaginate(
			User.aggregate([
				{
					$match: {
						role: ROLES.USER
					}
				}
			]),
			options
		);
		users.docs = users.docs.map((user: any) => getUserProps(user));
		res.status(HTTP_STATUS.OK).send(users);
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}

export async function getAuthUser(req: express.Request, res: express.Response) {
	res.status(HTTP_STATUS.OK).send(getUserProps(res.locals.userData._doc));
}

export async function postRegisterUser(
	req: express.Request,
	res: express.Response
) {
	if (await (User as any).emailTaken(req.body.email)) {
		throwResumeError(
			HTTP_STATUS.CONFLICT,
			ERROR_MESSAGES.EMAIL_ALREADY_IN_USE,
			req
		);
	}
	const user = new User({
		...req.body
	});
	try {
		const doc = await user.save();
		const emailToken = user.generateEmailVerificationToken();
		res.status(HTTP_STATUS.CREATED).send(getUserProps(doc._doc));
		sendWelcomeEmail(doc._doc);
		sendVerificationEmail(doc._doc, emailToken);
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}
export async function postLoginUser(
	req: express.Request,
	res: express.Response
) {
	let user = await User.findOne({ email: req.body.email });
	const compare = user && (await user.comparePassword(req.body.password));
	if (!user || !compare) {
		throwResumeError(
			HTTP_STATUS.NOT_FOUND,
			ERROR_MESSAGES.INVALID_CREDENTIALS,
			req
		);
	}
	const session: any = req.session;
	session.user = {
		id: user.id,
		email: user.email
	};
	req.session.save(function (err: any) {
		if (err) {
			throwResumeError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ERROR_MESSAGES.LOGIN_ERROR,
				req,
				err
			);
		}
		return res.status(HTTP_STATUS.ACCEPTED).send(getUserProps(user._doc));
	});
}
export function postLogoutUser(
	req: express.Request,
	res: express.Response
): void {
	req.session.destroy((err: any) => {
		if (err) {
			throwResumeError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ERROR_MESSAGES.LOGOUT_ERROR,
				req,
				err
			);
		}
		res.clearCookie(SESSION_ID);
		res.status(HTTP_STATUS.ACCEPTED).send();
	});
}

export async function postForgetPassword(
	req: express.Request,
	res: express.Response
) {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			const token = user.generateForgetPasswordToken();
			const alreadyTokenExisted = await Token.findOne({ userId: user.id });
			if (alreadyTokenExisted) {
				alreadyTokenExisted.token = token;
				alreadyTokenExisted.modifiedAt = Date.now();
				await alreadyTokenExisted.save()
			} else {
				const dbToken = new Token({
					userId: user.id,
					token: token,
				});
				await dbToken.save();
			}
			sendForgetPasswordEmail(user, token);
		}
		res.status(HTTP_STATUS.ACCEPTED).send({
			message: MESSAGES.FORGET_PASSWORD
		});
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}

export async function postChangePassword(req: express.Request, res: express.Response) {
	try {
		const user = await User.findOne({ email: res.locals.userData.email });
		user.password = req.body.password;
		await user.save();
		res.status(HTTP_STATUS.ACCEPTED).send({
			message: MESSAGES.CHANGE_PASSWORD_SUCCESS
		});
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}

export async function verifyForgetPassword(req: express.Request, res: express.Response) {
	let decodedToken;
	let user;
	let dbToken;
	try {
		decodedToken = (User as any).validateToken(req.body.token);
		user = await User.findOne({ email: decodedToken.email });
		dbToken = await Token.findOne({ userId: user.id });
		if (!user || dbToken.token !== req.body.token) {
			throwResumeError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.INVALID_TOKEN, req);
		}
	} catch (error) {
		if (error instanceof ResumeError) {
			throw error;
		}
		throwResumeError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.INVALID_TOKEN, req, error);
	}
	if (req.body.password) {
		try {
			user.password = req.body.password;
			await Token.deleteOne({ userId: user.id });
			await user.save();
			res.status(HTTP_STATUS.ACCEPTED).send({
				message: MESSAGES.FORGET_PASSWORD_SUCCESS
			})
		} catch (error) {
			throwResumeError(
				HTTP_STATUS.SERVICE_UNAVAILABLE,
				ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
				req,
				error
			);
		}
	} else {
		res.status(HTTP_STATUS.ACCEPTED).send({
			message: MESSAGES.VALID_TOKEN
		})
	}
}

export async function resendEmailVerification(
	req: express.Request,
	res: express.Response
) {
	const user = new User(res.locals.userData);
	if (user.emailVerified) {
		throwResumeError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_OPERATION, req);
	}
	const emailToken = user.generateEmailVerificationToken();
	res.status(HTTP_STATUS.ACCEPTED).send({
		message: MESSAGES.EMAIL_VERIFCATION_MAIL_SEND
	});
	sendVerificationEmail(user, emailToken);
}

export async function emailVerify(req: express.Request, res: express.Response) {
	let decodedToken;
	try {
		decodedToken = (User as any).validateToken(req.body.token);
	} catch (error) {
		throwResumeError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.INVALID_TOKEN, req, error);
	}
	try {
		let user = await User.findOne({ email: decodedToken.email });
		if (!user) {
			throwResumeError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.INVALID_TOKEN, req);
		}
		if (!user.emailVerified) {
			user.emailVerified = true;
			await user.save();
		}
		res.status(HTTP_STATUS.ACCEPTED).send({
			message: MESSAGES.EMAIL_VERIFIED
		});
	} catch (error) {
		if (error instanceof ResumeError) {
			throw error;
		}
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}

const getUserProps = (user: any) => {
	return filterProps(user, ["__v", "password"], { _id: "id" });
};
