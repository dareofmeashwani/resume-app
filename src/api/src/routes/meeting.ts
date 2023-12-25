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
		members: setDifference(attendees,admins.map((admin: any) => admin.email)),
		status: "active",
		createdBy: payload.email,
		externalEventId: scheduledEvent.uri.split("/").pop(),
		joiningLink: scheduledEvent.location.join_url
	});
	await doc.save();
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

export async function cancelCalendlyMeeting(data: any) {
	console.log(JSON.stringify(data));
	//const data_cancelled = {"created_at":"2023-12-24T17:55:40.000000Z","created_by":"https://api.calendly.com/users/f2f32253-5f99-4d22-8950-51f86535e227","event":"invitee.canceled","payload":{"cancel_url":"https://calendly.com/cancellations/3e39fe12-9338-448d-b760-2217a35cc0a7","cancellation":{"canceled_by":"Ashwani Kumar Verma","canceler_type":"host","created_at":"2023-12-24T17:55:39.915208Z","reason":""},"created_at":"2023-12-24T17:27:38.192438Z","email":"ashwaniverma.verma@rediff.com","event":"https://api.calendly.com/scheduled_events/9a15cc4a-c99d-48e4-bc2b-b363b35c669c","first_name":null,"invitee_scheduled_by":null,"last_name":null,"name":"test account","new_invitee":null,"no_show":null,"old_invitee":null,"payment":null,"questions_and_answers":[],"reconfirmation":null,"reschedule_url":"https://calendly.com/reschedulings/3e39fe12-9338-448d-b760-2217a35cc0a7","rescheduled":false,"routing_form_submission":null,"scheduled_event":{"cancellation":{"canceled_by":"Ashwani Kumar Verma","canceler_type":"host","created_at":"2023-12-24T17:55:39.915208Z","reason":""},"created_at":"2023-12-24T17:27:38.162964Z","end_time":"2023-12-24T21:45:00.000000Z","event_guests":[],"event_memberships":[{"user":"https://api.calendly.com/users/f2f32253-5f99-4d22-8950-51f86535e227","user_email":"connect2ashwaniverma@gmail.com"}],"event_type":"https://api.calendly.com/event_types/ebd636e1-bf06-4b5b-a3f8-68add9964c7a","invitees_counter":{"total":1,"active":0,"limit":100},"location":{"join_url":"https://calendly.com/events/9a15cc4a-c99d-48e4-bc2b-b363b35c669c/google_meet","status":"pushed","type":"google_conference"},"name":"15 Minute Meeting","start_time":"2023-12-24T21:30:00.000000Z","status":"canceled","updated_at":"2023-12-24T17:55:39.924665Z","uri":"https://api.calendly.com/scheduled_events/9a15cc4a-c99d-48e4-bc2b-b363b35c669c"},"scheduling_method":null,"status":"canceled","text_reminder_number":null,"timezone":"Asia/Calcutta","tracking":{"utm_campaign":null,"utm_source":null,"utm_medium":null,"utm_content":null,"utm_term":null,"salesforce_uuid":null},"updated_at":"2023-12-24T17:55:39.938754Z","uri":"https://api.calendly.com/scheduled_events/9a15cc4a-c99d-48e4-bc2b-b363b35c669c/invitees/3e39fe12-9338-448d-b760-2217a35cc0a7"}};
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