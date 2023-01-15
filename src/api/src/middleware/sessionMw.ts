import session from "express-session";
import express from "express";
import config from "../config";
import * as connectMdbSess from "connect-mongodb-session";
import { SESSION_ID, ENV, SESSION_COLLECTION } from "../utils/constants";
const mongoUri = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOSTNAME}?retryWrites=true&w=majority`;
const connectMdbSessStore = connectMdbSess.default(session);
const sessionstore = new connectMdbSessStore({
	uri: mongoUri,
	collection: SESSION_COLLECTION,
	databaseName: config.DB_NAME
});
export const sessionMw = session({
	secret: config.PRIVATE_KEY,
	resave: false,
	saveUninitialized: false,
	name: SESSION_ID,
	cookie: {
		maxAge: Number(config.SESSION_EXPIRY),
		secure: false,//process.env.ENV === ENV.prod,
		sameSite: true,
		httpOnly: false
	},
	store: sessionstore
});
export function sessionCleaner(
	req: express.Request,
	res: express.Response,
	next: Function
) {
	(req.session as any)._garbage = new Date();
	req.session.touch();
	next();
}
