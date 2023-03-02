import * as express from "express";
import { HTTP_STATUS, ERROR_MESSAGES, ROLES, query } from "../utils/constants";
import { User } from "../models/userModel";
import { throwResumeError } from "../utils/errorHelper";
import { filterProps, processQueryParam } from "../utils/helpers";

const getUserProps = (user: any) => {
	return filterProps(
		user,
		[
			"__v",
			"password",
			"email",
			"emailVerified",
			"role",
			"createdAt",
			"modifiedAt",
		],
		{ _id: "id" }
	);
};

export async function getAdminList(req: express.Request, res: express.Response) {
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
						role: ROLES.ADMIN
					}
				}
			])
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
