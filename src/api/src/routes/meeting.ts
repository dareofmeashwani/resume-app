import * as express from "express";
import { HTTP_STATUS, ERROR_MESSAGES, ROLES, query, MESSAGES } from "../utils/constants";
import { throwResumeError } from "../utils/errorHelper";
import { filterProps, unique, processQueryParam, setDifference } from "../utils/helpers";
import config from "../config";
import meetingModel from "../models/meetingModel";
import {
	sendMeetingCancellation,
	sendInvite,
	sendMeetingUpdate
} from "../utils/email";
import { User } from "../models/userModel";
import { verfiyWebhookSignature } from "../utils/calendlyApi";

const getProps = (user: any) => {
	return filterProps(user, ["__v", "externalEventId", "createdBy"], {
		_id: "id"
	});
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
				createdBy: res.locals.userData.email
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
	if (response.externalEventId) {
		try {
			/*const zoomResponse = await zoom.update(
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
			);*/
			res.status(HTTP_STATUS.ACCEPTED).send(getProps(response._doc));
			/*sendMeetingUpdate(
				res.locals.userData,
				attendees.map((attendee: any) => attendee.email),
				await (
				await zoom.get(response._doc.externalEventId)
				).data,
				response
			);
			*/
		} catch (error) {
			throwResumeError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ERROR_MESSAGES.CALENDLY_CONNECTIVITY_ERROR,
				req,
				error
			);
		}
	} else {
		res.status(HTTP_STATUS.ACCEPTED).send(getProps(response._doc));
	}
};


export async function resendInvite(
	req: express.Request,
	res: express.Response
) {
	let admins = [];
	let response;
	try {
		admins = await User.find({ role: ROLES.ADMIN });
		response = await meetingModel.findOne({
			_id: req.params.meetingId,
			createdBy: res.locals.userData.email
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
		...admins.map((admin) => admin.email)
	]);
	/*sendZoomInvite(
		res.locals.userData,
		attendees,
		await (
			await zoom.get(response._doc.externalEventId)
		).data,
		response
	);*/
	res.status(HTTP_STATUS.ACCEPTED).send({
		message: MESSAGES.MEETING_NOTI_SEND
	});
}

export const getMeetingList = async function (
	req: express.Request,
	res: express.Response
) {
	try {
		const options = processQueryParam(
			[query.limit, query.page, query.sort, query.sortBy, query.listType],
			req.query
		);
		if (options.sort) {
			options.sort = { [options.sortBy]: options.sort };
		}
		const filterParams: any = {
			createdBy: res.locals.userData.email,
		};
		if (options.listType === "previous") {
			filterParams.end = { $lte: new Date() };
		} else if (options.listType === "upcoming") {
			filterParams.end = { $gte: new Date() };
		}
		const docList = await meetingModel.aggregatePaginate(
			meetingModel.aggregate([
				{
					$match: filterParams
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
			createdBy: res.locals.userData.email
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

export async function createCalendlyMeeting(data: any) {
	const payload = data.payload;
	const scheduledEvent = data.payload.scheduled_event;
	const admins = await User.find({ role: ROLES.ADMIN });
	let attendees = scheduledEvent.event_guests.map((userInfo: any) => userInfo.user_email);
	attendees.push(...scheduledEvent.event_memberships.map((userInfo: any) => userInfo.user_email));
	const doc = new meetingModel({
		title: scheduledEvent.name,
		start: scheduledEvent.start_time,
		end: scheduledEvent.end_time,
		members: setDifference(attendees, admins.map((admin: any) => admin.email)),
		status: "active",
		createdBy: payload.email,
		externalEventId: scheduledEvent.uri.split("/").pop(),
		joiningLink: scheduledEvent.location.join_url
	});
	await doc.save();
}

export async function cancelCalendlyMeeting(data: any) {
	const payload = data.payload;
	const scheduledEvent = data.payload.scheduled_event;
	await meetingModel.updateOne(
		{
			externalEventId: scheduledEvent.uri.split("/").pop(),
			createdBy: payload.email,
		},
		{
			$set: {
				status: "inactive",
				modifiedAt: Date.now()
			}
		}
	);
}

export async function meetingWebhook(
	req: express.Request,
	res: express.Response) {
	const headers = req.headers;
	const body = req.body;
	const calendlySignature = (headers['Calendly-Webhook-Signature'] || headers['calendly-webhook-signature']) as string;
	if (!verfiyWebhookSignature(calendlySignature, body)) {
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
			message: "Invalid request"
		});
		throwResumeError(
			HTTP_STATUS.UNAUTHORIZED,
			ERROR_MESSAGES.WEBHOOK_REQUEST_UNAUTHORIZED,
			req
		);
	}
	try {
		if (body.event === "invitee.created") {
			await createCalendlyMeeting(body);
		} else if (body.event === "invitee.canceled") {
			await cancelCalendlyMeeting(body);
		}
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			ERROR_MESSAGES.WEBHOOK_HANDLING_ERROR,
			req,
			error
		);
	}
	res.status(HTTP_STATUS.OK).send({
		message: MESSAGES.SUCCESS_RESPONSE
	});
}