import { sign } from "jsonwebtoken";
import axios from "axios";
import config from "../config";
import { generateRandom } from "./helpers";

const url = "https://api.zoom.us/v2/users/" + config.EMAIL + "/meetings";
const meetingUrl = "https://api.zoom.us/v2/meetings/";

function getToken() {
	const payload = {
		iss: config.ZOOM_SDK_KEY,
		exp: new Date().getTime() + 5000
	};
	return sign(payload, config.ZOOM_SDK_SECRET);
}

function getOptions() {
	return {
		headers: {
			Authorization: "Bearer " + getToken(),
			"User-Agent": "Zoom-api-Jwt-Request",
			"content-type": "application/json"
		}
	};
}

export async function create(payload: any, attendees: string[]) {
	payload = Object.assign(
		{
			type: 2,
			timezone: "Europe/London",
			password: generateRandom(8),
			settings: {
				host_video: true,
				participant_video: true,
				cn_meeting: false,
				in_meeting: false,
				join_before_host: true,
				mute_upon_entry: true,
				watermark: false,
				use_pmi: false,
				focus_mode: true,
				audio: "both",
				auto_recording: "none",
				enforce_login: false,
				registrants_email_notification: true,
				waiting_room: false,
				allow_multiple_devices: true,
				meeting_invitees: attendees
			}
		},
		payload
	);
	const result = await axios.post(url, payload, getOptions());
	return result.data;
}
export async function update(id: string, payload: any, attendees: string[]) {
	payload = Object.assign(
		{
			type: 2,
			timezone: "Europe/London",
			password: generateRandom(8),
			settings: {
				host_video: true,
				participant_video: true,
				cn_meeting: false,
				in_meeting: false,
				join_before_host: true,
				mute_upon_entry: true,
				watermark: false,
				use_pmi: false,
				focus_mode: true,
				audio: "both",
				auto_recording: "none",
				enforce_login: false,
				registrants_email_notification: true,
				waiting_room: false,
				allow_multiple_devices: true,
				meeting_invitees: attendees
			}
		},
		payload
	);
	const result = await axios.patch(meetingUrl + id, payload, getOptions());
	return result.data;
}
export async function del(id: string) {
	return await axios.delete(meetingUrl + id, getOptions());
}
export async function list(ids: string[]) {
	const meetings: any[] = [];
	await Promise.all(
		ids.map(async (id: string) => {
			const response = await get(id);
			meetings.push(response.data);
		})
	);
	return meetings;
}
export async function get(id: string) {
	return await axios.get(meetingUrl + id, getOptions());
}
