import express from "express";
import { OpenAPIV3 } from "openapi-types";
import { connector } from "swagger-routes-express";
import "express-async-errors";
import * as jsyaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";
import config from "./config";
import * as api from "./routes";
import middleware from "./middleware";
import mongoose from "mongoose";
import {
	loginCheck,
	emailVerifyCheck,
	permissionsCheck
} from "./middleware/auth";
import prepareContent from "./utils/prepareContent";
import { registorWebhook } from "./utils/calendlyApi";

async function main() {
	const app = express();
	const applyGlobalMiddleware = (type: string) => {
		(middleware as any)[type].forEach((mw: any) => {
			app.use(mw);
		});
	};

	const specFilePath = path.join(__dirname, "./spec/openapi.yaml");
	const swaggerSpec = jsyaml.load(
		fs.readFileSync(specFilePath, "utf8").toString()
	) as OpenAPIV3.Document;
	const connect = connector(api, swaggerSpec, {
		onCreateRoute: (method: string, descriptor: any[]) => {
			console.log(`${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`);
		},
		middleware: {
			loginCheck,
			emailVerifyCheck,
			permissionsCheck
		}
	});
	const mongoUri = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOSTNAME}?retryWrites=true&w=majority`;
	mongoose.connect(
		mongoUri,
		{
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			dbName: config.DB_NAME
		},
		() => {
			console.log("Connect to mongodb");
		}
	);
	applyGlobalMiddleware("pre");
	connect(app);
	applyGlobalMiddleware("post");
	const port = config.PORT;
	app.use(express.static(path.join(__dirname, "public")));
	app.use("/images", express.static(path.join(__dirname, "images")));
	app.get('/*', function (req, res) {
		res.sendFile(path.join(__dirname, 'public/index.html'), function (err) {
			if (err) {
				res.status(500).send(err)
			}
		})
	})
	//await prepareContent();
	//await registorWebhook();
	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
}
main();
