import express from "express";
import * as path from "path";
import * as OpenApiValidator from "express-openapi-validator";
import bodyParser from "body-parser";
import { sessionMw, sessionCleaner } from "./sessionMw";
import corsMw from "./cors";
import errorResponder from "./errorResponder";
import { v4 as uuid } from "uuid";

// openapi spec validation error handler
const validationErrorMw = (
	err: any,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	res.status(err.status).json({
		error: {
			type: "request_validation",
			message: err.message,
			errors: err.errors
		}
	});
};
const genRequestId = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	(req as any).resquestId = uuid();
    next();
};
// openapi validator middleware
const specFilePath = path.join(__dirname, "../spec/openapi.yaml");
const validatorOptions = {
	coerceTypes: true,
	apiSpec: specFilePath,
	validateRequests: true,
	validateResponses: true
};
const openApiValidatorMw = OpenApiValidator.middleware(validatorOptions);
const bodyParserMw = bodyParser.json();

export default {
	pre: [
		genRequestId,
		validationErrorMw,
		openApiValidatorMw,
		bodyParserMw,
		corsMw,
		sessionMw,
		sessionCleaner
	],
	post: [errorResponder]
};
