import express from "express";
import { HTTP_STATUS, MESSAGES } from "../utils/constants";
import { ResumeError } from "../utils/resumeError";
export default function errorResponder(
	error: ResumeError | any,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	res.header("Content-Type", "application/json");
	if (!(error instanceof ResumeError)) {
		console.log((error as Error).stack);
		error = new ResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			MESSAGES.GENERIC_ERROR,
			error
		);
	}
	const errorJson = error.toJson();
	errorJson.resquestId = (req as any).requestId;
	console.log("########## ERROR ##########");
	console.log("Request Id : " + errorJson.resquestId);
	console.log(errorJson);
	res.status(error.statusCode).send(errorJson);
}
