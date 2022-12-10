import * as express from "express";
import { HTTP_STATUS, MESSAGES, ROLES } from "../utils/constants";
import { throwResumeError } from "../utils/resumeError";
import { checkAuth, getWeekStartEnd, filterProps } from "../utils/helpers";
import config from "../config";
import createEndpoints from "../utils/genericEndpoint";
import meetingModel from "../models/meetingModel";
import { google } from "googleapis";

const SCOPES = [
	"https://www.googleapis.com/auth/calendar",
	"https://www.googleapis.com/auth/calendar.events"
];
const jwtClient = new google.auth.JWT(
	config.GOOGLE_CLIENT_EMAIL,
	undefined,
	config.GOOGLE_CLIENT_KEY,
	SCOPES
);
const calendar = google.calendar({ version: "v3", auth: jwtClient });

export async function getMeetingStatus(
	req: express.Request,
	res: express.Response
) {
	let timestamp: any;
	if (req.query.timestamp) {
		timestamp = new Date((req.query.timestamp || "") as string);
	}
	const weekRange = getWeekStartEnd(timestamp);
	try {
		const events = await calendar.events.list({
			calendarId: config.ADMIN_EMAIL,
			timeMin: weekRange.start,
			timeMax: weekRange.end
		});
		const meetingStatus = events.data.items?.map((event) => {
			return {
				start: new Date(event?.start?.dateTime as string).toISOString(),
				end: new Date(event?.end?.dateTime as string).toISOString()
			};
		});
		res.status(HTTP_STATUS.OK).send({
			count: meetingStatus?.length,
			docs: meetingStatus
		});
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			MESSAGES.GOOGLE_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
}

const getProps = (user: any) => {
	return filterProps(user, ["__v", "gEventId"], { _id: "id" });
};
const meeting = createEndpoints(
	meetingModel,
	getProps,
	(req: any) => req.params.meetingId
);
export const getMeetingList = meeting.getDocList;
export const getMeeting = meeting.getDoc;

export const createMeeting = async (
	req: express.Request,
	res: express.Response
) => {
	const attendees: any = [
		//{ email: res.locals.userData.email }
	];
	if (req.body.members && false) {
		req.body.members.forEach((member: string) => {
			attendees.push({ email: member });
		});
	}
	var event = {
		summary: req.body.title || "Meeting with " + config.ADMIN_EMAIL,
		location: "Virtual / Google Meet",
		description: req.body.description || "",
		start: {
			dateTime: "2022-12-13T09:00:00-07:00",
			timeZone: "Asia/Kolkata"
		},
		end: {
			dateTime: "2022-12-14T09:00:00-07:00",
			timeZone: "Asia/Kolkata"
		},
		attendees,
		reminders: {
			useDefault: true
		},
		conferenceData: {
			createRequest: {
				conferenceSolutionKey: {
					type: "hangoutsMeet"
				},
				requestId: "coding-calendar-demo"
			}
		}
	};
	let gResponse: any;
	try {
		gResponse = await calendar.events.insert({
			auth: jwtClient,
			calendarId: config.ADMIN_EMAIL,
			requestBody: event,
			conferenceDataVersion: 1
		});
	} catch (error) {
		console.error(error);
		throwResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			MESSAGES.GOOGLE_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	req.body.gEventId = "gEventId";
	meeting.postDoc(req, res);
};
export const patchMeeting = (req: express.Request, res: express.Response) => {
	try {
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			MESSAGES.GOOGLE_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	meeting.patchDoc(req, res);
};
export const deleteMeeting = (req: express.Request, res: express.Response) => {
	try {
	} catch (error) {
		throwResumeError(
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			MESSAGES.GOOGLE_CONNECTIVITY_ERROR,
			req,
			error
		);
	}
	meeting.deleteDoc(req, res);
};

async function name() {
	var event = {
		summary: "My first event!",
		location: "Hyderabad,India",
		description: "First event with nodeJS!",
		start: {
			dateTime: "2022-01-12T09:00:00-07:00",
			timeZone: "Asia/Dhaka"
		},
		end: {
			dateTime: "2022-01-14T17:00:00-07:00",
			timeZone: "Asia/Dhaka"
		},
		attendees: [],
		reminders: {
			useDefault: false,
			overrides: [
				{ method: "email", minutes: 24 * 60 },
				{ method: "popup", minutes: 10 }
			]
		}
	};

	calendar.events.insert(
		{
			auth: jwtClient,
			calendarId: config.ADMIN_EMAIL,
			requestBody: event
		},
		function (err: any, event: any) {
			if (err) {
				console.log("There was an error contacting the Calendar service: " + err);
				return;
			}
			console.log("Event created: %s", event.data);
		}
	);
}
