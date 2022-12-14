import * as express from "express";
import * as path from "path";
import { HTTP_STATUS, MESSAGES } from "../utils/constants";
import fs from "fs";
import config from "../config";
import { throwResumeError } from "../utils/resumeError";

var mime = {
	html: "text/html",
	txt: "text/plain",
	css: "text/css",
	gif: "image/gif",
	jpg: "image/jpeg",
	png: "image/png",
	svg: "image/svg+xml",
	js: "application/javascript"
};

export const imageList = function (
	req: express.Request,
	res: express.Response
) {
	const filesPath = path.join(__dirname, "../images");
	const fileList = fs
		.readdirSync(filesPath)
		.map((file) => `${config.DOMAIN_ADDRESS}/api/v1/images/${file}`);
	res.status(HTTP_STATUS.OK).send(fileList);
};

export const getImage = function (req: express.Request, res: express.Response) {
	const filename = req.params.filename;
	const filePath = path.join(__dirname, "../images/" + filename);
	if (!fs.existsSync(filePath)) {
		throwResumeError(HTTP_STATUS.NOT_FOUND, MESSAGES.NOT_FOUND_ERROR, req);
	}
	const ext: string = path.extname(filename).slice(1);
	let type = (mime as any)[ext] || "text/plain";
	let stream = fs.createReadStream(filePath);
	stream.on("open", function () {
		res.set("Content-Type", type);
		stream.pipe(res);
	});
	stream.on("error", function () {
		res.set("Content-Type", "text/plain");
		res.status(404).end("Not found");
	});
};
