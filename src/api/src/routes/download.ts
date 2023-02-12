import * as express from "express";
import config from "../config";
import * as path from "path";
import fs from "fs";
import { throwResumeError } from "../utils/errorHelper";
import { HTTP_STATUS, ERROR_MESSAGES } from "../utils/constants";


export const downloadsList = function (
	req: express.Request,
	res: express.Response
) {
	const filesPath = path.join(__dirname, "../downloads");
	if (!fs.existsSync(filesPath)) {
		res.status(HTTP_STATUS.OK).send([]);
		return;
	}
	const fileList = fs
		.readdirSync(filesPath)
		.map((file) => encodeURI(`${config.DOMAIN_ADDRESS}/api/v1/downloads/${file}`));
	res.status(HTTP_STATUS.OK).send(fileList);
};

export const downloadFile = function (
	req: express.Request,
	res: express.Response
) {
	const filename = req.params.filename;
	if (filename.includes("..")) {
		throwResumeError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.INVALID_OPERATION, req);
	}
	const filePath = path.join(__dirname, "../downloads/" + filename);
	if (!fs.existsSync(filePath)) {
		throwResumeError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND_ERROR, req);
	}
	res.setHeader("content-disposition", "attachment; filename=" + filename);
	res.setHeader("x-content-type-options", "nosniff");
	res.setHeader(
		"content-security-policy",
		`default-src 'self' ${config.DOMAIN_ADDRESS}`
	);
	res.download(filePath);
};
