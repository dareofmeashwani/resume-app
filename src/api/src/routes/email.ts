import * as express from "express";
import { User } from "../models/userModel";
import { HTTP_STATUS, MESSAGES } from "../utils/constants";
import { sendVerificationEmail } from "../utils/email";
import { filterProps } from "../utils/helpers";
import { ResumeError, throwResumeError } from "../utils/resumeError";
export async function emailVerify(req: express.Request, res: express.Response) {
	let decodedToken;
	try {
		decodedToken = (User as any).validateToken(req.body.token);
	} catch (error) {
		throwResumeError(HTTP_STATUS.FORBIDDEN, MESSAGES.INVALID_TOKEN, req, error);
	}
	try {
		let user = await User.findOne({ email: decodedToken.email });
		if (!user) {
			throwResumeError(HTTP_STATUS.FORBIDDEN, MESSAGES.INVALID_TOKEN, req);
		}
		if (!user.emailVerified) {
			user.emailVerified = true;
			await user.save();
		}
		res.status(HTTP_STATUS.OK).send(getUserProps(user._doc));
	} catch (error) {
		if (error instanceof ResumeError) {
			throw error;
		}
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}

export async function emailResendVerification(
	req: express.Request,
	res: express.Response
) {
	const user = new User(res.locals.userData);
	if (user.emailVerified) {
		throwResumeError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.INVALID_OPERATION, req);
	}
	const emailToken = user.generateEmailActivationToken();
	res.send(HTTP_STATUS.OK);
	sendVerificationEmail(user, emailToken);
}

const getUserProps = (user: any) => {
	return filterProps(user, ["__v", "password"], { _id: "id" });
};
