import * as express from "express";
import { HTTP_STATUS, ERROR_MESSAGES, ROLES, query, MESSAGES } from "../utils/constants";
import { throwResumeError } from "../utils/errorHelper";
import { filterProps, processQueryParam, setDifference } from "../utils/helpers";
import meetingModel from "../models/meetingModel";
import { User } from "../models/userModel";
import { verfiyWebhookSignature, cancelCalendlyInvite } from "../utils/calendlyApi";

const getProps = (user: any) => {
	return filterProps(user, ["__v", "externalEventId"], {
		_id: "id"
	});
};

export const cancelInvite = async (
	req: express.Request,
	res: express.Response
) => {
	let response;
	try {
		response = await meetingModel.findOneAndUpdate(
			{
				_id: req.query.meetingId,
				createdBy: res.locals.userData.email
			},
			{
				$set: {
					status: "inactive"
				}
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
	try {
		await cancelCalendlyInvite(
			response.externalEventId,
			res.locals.userData.role === ROLES.USER ?
				MESSAGES.REQ_DENY_BY_USER : MESSAGES.REQ_DENY_BY_ADMIN
		);
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			ERROR_MESSAGES.CALENDLY_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	res.status(HTTP_STATUS.ACCEPTED).send({
		message: MESSAGES.CANCEL_INVITE
	});
};

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
		const filterParams: any = {};
		if (res.locals.userData.role === ROLES.USER) {
			filterParams.createdBy = res.locals.userData.email
		}
		if (options.listType === "previous") {
			filterParams.end = { $lte: new Date() };
		} else if (options.listType === "upcoming") {
			filterParams.end = { $gte: new Date() };
			filterParams.status = "active";
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

export async function createCalendlyMeeting(data: any) {
	const payload = data.payload;
	const scheduledEvent = data.payload.scheduled_event;
	const admins = await User.find({ role: ROLES.ADMIN });
	const questionsAnswers = payload.questions_and_answers;
	let attendees = scheduledEvent.event_guests.map((userInfo: any) => userInfo.user_email);
	attendees.push(...scheduledEvent.event_memberships.map((userInfo: any) => userInfo.user_email));
	const doc = new meetingModel({
		title: scheduledEvent.name,
		description: Array.isArray(questionsAnswers) && questionsAnswers.length && questionsAnswers[0] ? questionsAnswers[0].answer : "",
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
		console.log(JSON.stringify(body));
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