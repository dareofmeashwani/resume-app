import * as express from "express";
import * as path from "path";
import { HTTP_STATUS } from "../utils/constants";
import fs from "fs";
import config from "../config";

export const imageList = function (
	req: express.Request,
	res: express.Response
) {
	const filesPath = path.join(__dirname, "../images");
	const fileList = fs
		.readdirSync(filesPath)
		.filter((file) => fs.lstatSync(path.join(filesPath, file)).isFile() && !file.startsWith("__") && !file.startsWith("."))
		.map((file) => ({
			thumbnail: encodeURI(`/images/thumbnails/${file}`),
			img: encodeURI(`/images/${file}`)
		}));
	res.status(HTTP_STATUS.OK).send(fileList);
};
