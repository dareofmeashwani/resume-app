import * as express from "express";
import { HTTP_STATUS, ERROR_MESSAGES, query } from "../utils/constants";
import Query from "../models/queryModel";
import { throwResumeError } from "../utils/errorHelper";
import { filterProps, processQueryParam } from "../utils/helpers";
import { sendQueryNotificationToAdmin } from "../utils/email";

export async function getQueryList(
	req: express.Request,
	res: express.Response
) {
	try {
		const options = processQueryParam(
			[query.limit, query.page, query.sort],
			req.query
		);
		if (options.sort) {
			options.sort = { createdAt: options.sort };
		}
		const queries = await Query.aggregatePaginate(Query.aggregate(), options);
		queries.docs = queries.docs.map((user: any) => getProps(user));
		res.status(HTTP_STATUS.OK).send(queries);
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}

export async function createQuery(req: express.Request, res: express.Response) {
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
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}
const getProps = (user: any) => {
	return filterProps(user, ["__v"], { _id: "id" });
};
