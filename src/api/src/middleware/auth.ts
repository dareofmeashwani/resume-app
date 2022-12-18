import express from "express";
import { User } from "../models/userModel";
import { HTTP_STATUS, MESSAGES, ROLES } from "../utils/constants";
import { throwResumeError } from "../utils/resumeError";
export async function loginCheck(
	req: express.Request,
	res: express.Response,
	next: Function
) {
	if (!(req.session as any).user) {
		throwResumeError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED, req);
	}
	const user = req.session && (req.session as any).user;
	const userdata = await User.findOne({ email: user.email });
	res.locals.userData = userdata;
	next();
}
export async function emailVerifyCheck(
	req: express.Request,
	res: express.Response,
	next: Function
) {
	if (!res.locals.userData.emailVerified) {
		throwResumeError(HTTP_STATUS.FORBIDDEN, MESSAGES.UNVERIFIED_EMAIL_ERROR, req);
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
	const userPermissions =
		res.locals.userData.role === ROLES.ADMIN
			? [
					"system.user.read",
					"system.educations.read",
					"system.educations.create",
					"system.educations.update",
					"system.educations.delete",
					"system.extraCurriculars.read",
					"system.extraCurriculars.create",
					"system.extraCurriculars.update",
					"system.extraCurriculars.delete",
					"system.projects.read",
					"system.projects.create",
					"system.projects.update",
					"system.projects.delete",
					"system.responsibilities.read",
					"system.responsibilities.create",
					"system.responsibilities.update",
					"system.responsibilities.delete",
					"system.skills.read",
					"system.skills.create",
					"system.skills.update",
					"system.skills.delete",
					"system.trainings.read",
					"system.trainings.create",
					"system.trainings.update",
					"system.trainings.delete",
					"system.workExperiences.read",
					"system.workExperiences.create",
					"system.workExperiences.update",
					"system.workExperiences.delete",
					"system.query.read"
			  ]
			: [
					"system.educations.read",
					"system.extraCurriculars.read",
					"system.projects.read",
					"system.responsibilities.read",
					"system.skills.read",
					"system.trainings.read",
					"system.workExperiences.read"
			  ];
	if (
		permissions &&
		!permissions.reduce(
			(acc: boolean, perm: never) => acc && userPermissions.includes(perm),
			true
		)
	) {
		throwResumeError(HTTP_STATUS.FORBIDDEN, MESSAGES.UNAUTHORIZED, req);
	}
	next();
}
