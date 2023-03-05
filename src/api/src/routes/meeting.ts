import * as express from "express";
import { HTTP_STATUS, ERROR_MESSAGES, ROLES, query } from "../utils/constants";
import { throwResumeError } from "../utils/errorHelper";
import { getWeekStartEnd, filterProps, unique, processQueryParam } from "../utils/helpers";
import config from "../config";
import meetingModel from "../models/meetingModel";
import * as zoom from "../utils/zoomApi";
import {
	sendZoomCancellation,
	sendZoomInvite,
	sendZoomUpdate
} from "../utils/email";
import { User } from "../models/userModel";
const getProps = (user: any) => {
	return filterProps(user, ["__v", "externalEventId", "createdBy"], {
		_id: "id"
	});
};

export const getMeetingList = async function (
	req: express.Request,
	res: express.Response
) {
	try {
		const options = processQueryParam(
			[query.limit, query.page, query.sort],
			req.query
		);
		if (options.sort) {
			options.sort = { createdAt: options.sort };
		}
		const docList = await meetingModel.aggregatePaginate(
			meetingModel.aggregate([
				{
					$match: {
						createdBy: res.locals.userData.id
					}
				}
			]),
			options
		);
		docList.docs = docList.docs.map((doc: any) => getProps(doc));
		res.status(HTTP_STATUS.OK).send(docList);
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
};
export const getMeeting = async function (
	req: express.Request,
	res: express.Response
) {
	try {
		const response = await meetingModel.findOne({
			_id: req.params.meetingId,
			createdBy: res.locals.userData.id
		});
		if (!response) {
			throwResumeError(
				HTTP_STATUS.NOT_FOUND,
				ERROR_MESSAGES.NOT_FOUND_ERROR,
				req
			);
		}
		res.status(HTTP_STATUS.OK).send(getProps(response._doc));
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
};

export const createMeeting = async (
	req: express.Request,
	res: express.Response
) => {
	let admins = [];
	try {
		admins = await User.find({ role: ROLES.ADMIN });
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	let attendees: any = [
		{ email: res.locals.userData.email },
		...admins.map((admin: any) => {
			return {
				email: admin.email
			};
		})
	];
	if (req.body.members) {
		req.body.members.forEach((member: string) => {
			attendees.push({ email: member });
		});
	}
	attendees = unique(attendees, "email");
	let response: any = {};
	if (!req.query.noLink) {
		try {
			response = await zoom.create(
				{
					topic: req.body.title || "Meeting with " + config.DOMAIN_NAME,
					agenda: req.body.description || "",
					start_time: new Date(req.body.start).toISOString(),
					duration: Math.floor(
						(new Date(req.body.end).getTime() - new Date(req.body.start).getTime()) /
						60000
					)
				},
				attendees
			);
			sendZoomInvite(
				res.locals.userData,
				attendees.map((attendee: any) => attendee.email),
				response
			);
		} catch (error) {
			throwResumeError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ERROR_MESSAGES.ZOOM_CONNECTIVITY_ERROR,
				req,
				error
			);
		}
	}
	req.body.members = req.body.members && unique(req.body.members);
	const doc = new meetingModel({
		...req.body,
		createdBy: res.locals.userData.id,
		externalEventId: response.id
	});
	try {
		const response = await doc.save();
		res.status(HTTP_STATUS.CREATED).send(getProps(response._doc));
	} catch (error) {
		zoom.del(response.id);
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
};
export const patchMeeting = async (
	req: express.Request,
	res: express.Response
) => {
	let response;
	let admins = [];
	try {
		admins = await User.find({ role: ROLES.ADMIN });
		req.body.members = req.body.members && unique(req.body.members);
		response = await meetingModel.findOneAndUpdate(
			{
				_id: req.params.meetingId,
				createdBy: res.locals.userData.id
			},
			{
				$set: req.body
			},
			{ new: true }
		);
		if (!response) {
			throwResumeError(
				HTTP_STATUS.NOT_FOUND,
				ERROR_MESSAGES.NOT_FOUND_ERROR,
				req
			);
		}
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	let attendees: any = [
		{ email: res.locals.userData.email },
		...admins.map((admin: any) => {
			return {
				email: admin.email
			};
		})
	];
	if (response.members) {
		response.members.forEach((member: string) => {
			attendees.push({ email: member });
		});
	}
	attendees = unique(attendees, "email");
	try {
		const zoomResponse = await zoom.update(
			response.externalEventId,
			{
				topic: response.title,
				agenda: response.description,
				start_time: new Date(response.start).toISOString(),
				duration: Math.floor(
					(new Date(response.end).getTime() - new Date(response.start).getTime()) /
					60000
				)
			},
			attendees
		);
		res.status(HTTP_STATUS.ACCEPTED).send(getProps(response._doc));
		sendZoomUpdate(
			res.locals.userData,
			attendees.map((attendee: any) => attendee.email),
			await (
				await zoom.get(response._doc.externalEventId)
			).data
		);
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			ERROR_MESSAGES.ZOOM_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
};
export const deleteMeeting = async (
	req: express.Request,
	res: express.Response
) => {
	let admins = [];
	let response;
	try {
		admins = await User.find({ role: ROLES.ADMIN });
		response = await meetingModel.findOne({
			_id: req.params.meetingId,
			createdBy: res.locals.userData.id
		});
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	if (!response) {
		throwResumeError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND_ERROR, req);
	}
	let attendees: any = unique([
		...response._doc.members,
		res.locals.userData.email,
		admins.map((admin) => admin.email)
	]);
	let zoomData;
	try {
		zoomData = await zoom.get(response._doc.externalEventId);
		await zoom.del(response._doc.externalEventId);
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			ERROR_MESSAGES.ZOOM_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	try {
		await meetingModel.deleteOne({ _id: req.params.meetingId });
		res.status(HTTP_STATUS.ACCEPTED).send();
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	sendZoomCancellation(res.locals.userData, attendees, zoomData?.data);
};

export async function getMeetingStatus(
	req: express.Request,
	res: express.Response
) {
	let timestamp: any;
	if (req.query.timestamp) {
		timestamp = new Date((req.query.timestamp || "") as string);
	}
	timestamp.setHours(0, 0, 0, 0);
	const start = new Date(timestamp);
	timestamp.setDate(timestamp.getDate() + 1);
	try {
		const response = await meetingModel.find({
			start: { $gte: start, $lte: timestamp }
		});
		const meetingStatus: any[] = response.map((event) => {
			return {
				start: new Date(event.start as string).toISOString(),
				end: new Date(event.end as string).toISOString()
			};
		});
		res.status(HTTP_STATUS.OK).send({
			count: meetingStatus?.length,
			docs: meetingStatus
		});
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}

export async function zoomResendInvite(
	req: express.Request,
	res: express.Response
) {
	let admins = [];
	let response;
	try {
		admins = await User.find({ role: ROLES.ADMIN });
		response = await meetingModel.findOne({
			_id: req.params.meetingId,
			createdBy: res.locals.userData.id
		});
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.SERVICE_UNAVAILABLE,
			ERROR_MESSAGES.DB_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	if (!response) {
		throwResumeError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND_ERROR, req);
	}
	let attendees: any = unique([
		...response._doc.members,
		res.locals.userData.email,
		admins.map((admin) => admin.email)
	]);
	sendZoomInvite(
		res.locals.userData,
		attendees,
		await (
			await zoom.get(response._doc.externalEventId)
		).data
	);
	res.status(HTTP_STATUS.ACCEPTED).send();
}
