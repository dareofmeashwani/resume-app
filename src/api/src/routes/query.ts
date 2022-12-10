import * as express from "express";
import { HTTP_STATUS, MESSAGES, ROLES } from "../utils/constants";
import Query from "../models/queryModel";
import { throwResumeError } from "../utils/resumeError";
import { checkAuth, filterProps } from "../utils/helpers";
import { sendQueryNotificationToAdmin } from "../utils/email";

export async function getQueryList(
	req: express.Request,
	res: express.Response,
) {
	checkAuth(req, res, [ROLES.ADMIN]);
	try {
		/*const options = {
            page: req.body.page,
            limit,
            sort:{_id:'asc'}
        }*/
		const queries = await Query.aggregatePaginate(Query.aggregate());
		queries.docs = queries.docs.map((user: any) => getProps(user));
		res.status(HTTP_STATUS.OK).send(queries);
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			MESSAGES.DB_CONNECTIVITY_ERROR,
			req
		);
	}
}

export async function createQuery(
	req: express.Request,
	res: express.Response,
) {
	const query = new Query({
		...req.body
	});
	try {
		const doc = await query.save();
		res.status(HTTP_STATUS.CREATED).send(getProps(doc._doc));
		sendQueryNotificationToAdmin(doc._doc);
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			MESSAGES.DB_CONNECTIVITY_ERROR,
			req
		);
	}
}
const getProps = (user: any) => {
	return filterProps(user, ["__v"], { _id: "id" });
};
