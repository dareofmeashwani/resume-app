import axios, { AxiosResponse } from "axios";
import * as crypto from "crypto";
import config from "../config";


const url = {
	ME: "https://api.calendly.com/users/me",
	SUBSCRIPTIONS: "https://api.calendly.com/webhook_subscriptions",
}

let calendlyAdminData: any;

function getOptions() {
	return {
		headers: {
			Authorization: "Bearer " + config.CALENDLY_TOKEN,
			"content-type": "application/json",
			"Accept-Encoding": "gzip,deflate,compress"
		} as any
	};
}

export async function getAdminDetail() {
	if (!calendlyAdminData) {
		const options = getOptions();
		options.headers = Object.assign(options.headers, {
			"Accept-Encoding": "gzip,deflate,compress"
		})
		calendlyAdminData = (await axios.get(url.ME, options)).data.resource
	}
	return calendlyAdminData;
}

export function verfiyWebhookSignature(calendlySignature: string, data: any) {
	const { t, signature } = calendlySignature.split(',').reduce((acc, currentValue) => {
		const [key, value] = currentValue.split('=');
		if (key === 't') {
			acc.t = value;
		}
		if (key === 'v1') {
			acc.signature = value
		}
		return acc;
	}, {
		t: '',
		signature: ''
	});
	if (!t || !signature) {
		return false;
	}
	const expectedSignature = crypto.createHmac(
		'sha256',
		config.CALENDLY_SIGNING_KEY,
	).update(t + '.' + JSON.stringify(data), 'utf8').digest('hex');
	if (expectedSignature !== signature) {
		return false;
	}
	const threeMinutes = 180000 * 100;
	const tolerance = threeMinutes;
	const timestampMilliseconds = Number(t) * 1000;
	if (timestampMilliseconds < Date.now() - tolerance) {
		return false;
	}
	return true;
}

export async function registorWebhook() {
	const calendlyAdminData = await getAdminDetail();
	const subslist = (await axios.get(
		`${url.SUBSCRIPTIONS}?scope=organization&organization=${calendlyAdminData.current_organization}`
		, getOptions())).data;
	if (!subslist.collection.length) {
		const data = {
			"url": `${config.DOMAIN_ADDRESS}/api/v1/meetings/calendlyWebhook`,
			"events": [
				"invitee.created",
				"invitee.canceled",
				"invitee_no_show.created"
			],
			"organization": calendlyAdminData.current_organization,
			"user": calendlyAdminData.uri,
			"scope": "organization",
			"signing_key": config.CALENDLY_SIGNING_KEY
		};
		try {
			return (await axios.post(url.SUBSCRIPTIONS, data, getOptions())).data;
		} catch (error) {
			console.error(error);
		}
	}
	return subslist.collection[0];
}
/*
const url = "https://api.zoom.us/v2/users/" + config.EMAIL + "/meetings";
const meetingUrl = "https://api.zoom.us/v2/meetings/";

function getToken() {
	const payload = {
		iss: config.CALENDLY_TOKEN,
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
*/