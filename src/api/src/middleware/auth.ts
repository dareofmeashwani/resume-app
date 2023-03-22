import express from "express";
import { User } from "../models/userModel";
import { HTTP_STATUS, ERROR_MESSAGES, ROLES } from "../utils/constants";
import { throwResumeError } from "../utils/errorHelper";
export async function loginCheck(
	req: express.Request,
	res: express.Response,
	next: Function
) {
	if (!res.locals.userData) {
		throwResumeError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED, req);
	}
	next();
}
export async function pupolateUserInfo(
	req: express.Request,
	res: express.Response,
	next: Function
) {
	if ((req.session as any).user) {
		const user = req.session && (req.session as any).user;
		const userdata = await User.findOne({ email: user.email });
		res.locals.userData = userdata;
	}
	next();
}
export async function emailVerifyCheck(
	req: express.Request,
	res: express.Response,
	next: Function
) {
	if (!res.locals.userData.emailVerified) {
		throwResumeError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.UNVERIFIED_EMAIL_ERROR, req);
	}
	next();
}
export async function permissionsCheck(
	req: express.Request,
	res: express.Response,
	next: Function
) {
	const permissions =
		((req as any).openapi.schema["x-permissions"] as any) || [];
	if (
		permissions &&
		!permissions.includes(res.locals.userData.role)
	) {
		throwResumeError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.UNAUTHORIZED, req);
	}
	next();
}
