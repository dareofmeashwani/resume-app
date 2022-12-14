import * as express from "express";
import { HTTP_STATUS, MESSAGES } from "../utils/constants";
import { throwResumeError } from "../utils/resumeError";

export default function createEndpoints(
	model: any,
	propsFn: Function,
	idExtrator: Function
) {
	const getDocList = async function (
		req: express.Request,
		res: express.Response
	) {
		try {
			const docList = await model.aggregatePaginate(model.aggregate());
			docList.docs = docList.docs.map((doc: any) => propsFn(doc));
			res.status(HTTP_STATUS.OK).send(docList);
			return docList;
		} catch (error) {
			throwResumeError(
				HTTP_STATUS.SERVICE_UNAVAILABLE,
				MESSAGES.DB_CONNECTIVITY_ERROR,
				req,
				error
			);
		}
	};

	const postDoc = async function (req: express.Request, res: express.Response) {
		const doc = new model({
			...req.body
		});
		try {
			const response = await doc.save();
			res.status(HTTP_STATUS.CREATED).send(propsFn(response._doc));
			return response._doc;
		} catch (error) {
			throwResumeError(
				HTTP_STATUS.SERVICE_UNAVAILABLE,
				MESSAGES.DB_CONNECTIVITY_ERROR,
				req,
				error
			);
		}
	};
	const getDoc = async function (req: express.Request, res: express.Response) {
		try {
			const response = await model.findById(idExtrator(req));
			res.status(HTTP_STATUS.OK).send(propsFn(response._doc));
			return response._doc;
		} catch (error) {
			throwResumeError(
				HTTP_STATUS.SERVICE_UNAVAILABLE,
				MESSAGES.DB_CONNECTIVITY_ERROR,
				req,
				error,
			);
		}
	};
	const patchDoc = async function (req: express.Request, res: express.Response) {
		try {
			const response = await model.findOneAndUpdate(
				{
					_id: idExtrator(req)
				},
				{
					$set: req.body
				},
				{ new: true }
			);
			res.status(HTTP_STATUS.ACCEPTED).send(propsFn(response._doc));
			return response._doc;
		} catch (error) {
			throwResumeError(
				HTTP_STATUS.SERVICE_UNAVAILABLE,
				MESSAGES.DB_CONNECTIVITY_ERROR,
				req,
				error
			);
		}
	};
	const deleteDoc = async function (
		req: express.Request,
		res: express.Response
	) {
		try {
			let response = await model.findOneAndDelete({ _id: idExtrator(req) });
			res.status(HTTP_STATUS.ACCEPTED).send();
			return response._doc;
		} catch (error) {
			throwResumeError(
				HTTP_STATUS.SERVICE_UNAVAILABLE,
				MESSAGES.DB_CONNECTIVITY_ERROR,
				req,
				error,
			);
		}
	};
	return {
		getDocList,
		postDoc,
		getDoc,
		patchDoc,
		deleteDoc
	};
}
