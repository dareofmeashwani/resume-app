import * as express from "express";
import * as path from "path";
import { HTTP_STATUS } from "../utils/constants";
import fs from "fs";
import config from "../config";

var mime = {
	gif: "image/gif",
	jpg: "image/jpeg",
	png: "image/png",
	svg: "image/svg+xml"
};

export const imageList = function (
	req: express.Request,
	res: express.Response
) {
	const filesPath = path.join(__dirname, "../images");
	const fileList = fs
		.readdirSync(filesPath)
		.filter((file) => fs.lstatSync(path.join(filesPath, file)).isFile())
		.map((file) => ({
			thumbnail: encodeURI(`${config.DOMAIN_ADDRESS}/images/thumbnails/${file}`),
			img: encodeURI(`${config.DOMAIN_ADDRESS}/images/${file}`)
		}));
	res.status(HTTP_STATUS.OK).send(fileList);
};
