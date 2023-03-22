import express from "express";
import * as path from "path";
import * as OpenApiValidator from "express-openapi-validator";
import bodyParser from "body-parser";
import { sessionMw, sessionCleaner } from "./sessionMw";
import corsMw from "./cors";
import errorResponder from "./errorResponder";
import { v4 as uuid } from "uuid";
import { pupolateUserInfo } from "./auth";

// openapi spec validation error handler
const initializeRequestState = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const request = (req as any);
	request.requestId = uuid();
	next();
};
// openapi validator middleware
const specFilePath = path.join(__dirname, "../spec/openapi.yaml");
const validatorOptions = {
	apiSpec: specFilePath,
	validateRequests: true,
	validateResponses: true,
	
};
const openApiValidatorMw = OpenApiValidator.middleware(validatorOptions);
const bodyParserMw = bodyParser.json();

export default {
	pre: [
		initializeRequestState,
		bodyParserMw,
		corsMw,
		openApiValidatorMw,
		sessionMw,
		sessionCleaner,
		pupolateUserInfo,
	],
	post: [errorResponder]
};
