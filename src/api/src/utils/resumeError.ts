import { ErrorMessage } from "../interfaces";
import express from "express";
export class ResumeError {
	public statusCode: number;
	public msg: ErrorMessage;
	public details: any[];
	constructor(
		statusCode: number,
		message: ErrorMessage,
		req?: express.Request,
		error?: any
	) {
		this.statusCode = statusCode;
		this.msg = message;
		this.details = this.transform(req, error);
	}
	transform(req?: express.Request, error?: any) {
		if (!error) {
			return [];
		}
		return [];
	}
	toJson() {
		return {
			message: this.msg.message,
			code: this.msg.code,
			details: this.details
		};
	}
}

export const throwResumeError = (
	statusCode: number,
	message: ErrorMessage,
	req?: express.Request,
	error?: any
) => {
	throw new ResumeError(statusCode, message, req, error);
};
