import * as config from "./config";
import { google } from "googleapis";

// https://developers.google.com/calendar/api/guides/push
// https://stackoverflow.com/questions/71018001/how-to-set-up-a-google-calendar-web-hook-in-nodejs
// https://learn.microsoft.com/en-us/office/dev/add-ins/quickstarts/outlook-quickstart?tabs=yeomangenerator


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