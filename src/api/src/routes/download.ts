import * as express from "express";
import config from "../config";
import * as path from "path";
import fs from "fs";
import { throwResumeError } from "../utils/resumeError";
import { HTTP_STATUS, MESSAGES } from "../utils/constants";
export const downloadFile = function (
	req: express.Request,
	res: express.Response
) {
	const filename = req.params.filename;
	if (filename.includes("/")) {
		throwResumeError(HTTP_STATUS.FORBIDDEN, MESSAGES.INVALID_OPERATION, req);
	}
	const filePath = path.join(__dirname, "../download/" + filename);
	if (!fs.existsSync(filePath)) {
		throwResumeError(HTTP_STATUS.NOT_FOUND, MESSAGES.NOT_FOUND_ERROR, req);
	}
	res.setHeader("content-disposition", "attachment; filename=" + filename);
	res.setHeader("x-content-type-options", "nosniff");
	res.setHeader(
		"content-security-policy",
		`default-src 'self' ${config.DOMAIN_ADDRESS}`
	);
	res.download(filePath);
};
