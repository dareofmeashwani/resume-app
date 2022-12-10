import * as express from "express";
import mongoose from "mongoose";
import { HTTP_STATUS, MESSAGES } from "../utils/constants";
import { throwResumeError } from "../utils/resumeError";
export function checkAuth(
	req: express.Request,
	res: express.Response,
	permissions?: string[]
) {
	if (permissions) {
		if (permissions.indexOf(res.locals.userData.role.toString()) > -1) {
			return true;
		} else {
			throwResumeError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED, req);
		}
	}
	return true;
}

export function filterProps(source: any, ignore: any, change?: any) {
	let res = {};
	Object.keys(source).forEach((key: string) => {
		if (ignore.indexOf(key) > -1) {
			return;
		}
		let value = source[key];
		if (source[key] instanceof mongoose.Types.ObjectId) {
			value = source[key].toString();
		}
		if (change && change[key]) {
			key = change[key];
		}
		(res as any)[key] = value;
	});
	return res;
}

export function getWeekStartEnd(selectedDate: Date | undefined) {
	selectedDate = selectedDate || new Date();
	let first = selectedDate.getDate() - selectedDate.getDay();
	let last = first + 6;

	let firstday = new Date(
		new Date(selectedDate.setDate(first + 1)).setHours(0, 0, 0, 0)
	);
	let lastday = new Date(
		new Date(selectedDate.setDate(last)).setHours(23, 59, 59, 999)
	);
	return {
		start: firstday.toISOString(),
		end: lastday.toISOString()
	};
}
