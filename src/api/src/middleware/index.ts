import express from "express";
import * as path from "path";
import * as OpenApiValidator from 'express-openapi-validator';
import bodyParser from "body-parser";
import {User} from "../models/userModel"
import {sessionMw, sessionCleaner} from "./sessionMw";
import corsMw from "./cors";
import errorResponder from "./errorResponder";

// openapi spec validation error handler
const validationErrorMw = (err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
    res.status(err.status).json({
        error: {
            type: 'request_validation',
            message: err.message,
            errors: err.errors
        }
    })
}
// openapi validator middleware
const specFilePath = path.join(__dirname, "../spec/openapi.yaml");
const validatorOptions = {
    coerceTypes: true,
    apiSpec: specFilePath,
    validateRequests: true,
    validateResponses: true
}
const openApiValidatorMw = OpenApiValidator.middleware(validatorOptions);
const bodyParserMw = bodyParser.json()

async function fillUserInfo(req : express.Request, res : express.Response, next : Function) {
    const user = req.session && (req.session as any).user
    if (user && user.id) {
        const userdata = await User.findOne({ email: user.email});
        res.locals.userData = userdata;
    }
    next()
}

export default {
    pre: [
        validationErrorMw,
        openApiValidatorMw,
        bodyParserMw,
        corsMw,
        sessionMw,
        sessionCleaner,
        fillUserInfo
    ],
    post: [errorResponder]
};
