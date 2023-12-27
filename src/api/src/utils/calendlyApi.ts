import axios, { AxiosResponse } from "axios";
import * as crypto from "crypto";
import config from "../config";


const url = {
	ME: "https://api.calendly.com/users/me",
	SUBSCRIPTIONS: "https://api.calendly.com/webhook_subscriptions",
	CANCEL_MEETING: "https://api.calendly.com/scheduled_events/{uuid}/cancellation"
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
				"invitee_no_show.created",
				"routing_form_submission.created"
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

export async function cancelCalendlyInvite(id: string, reason?: string) {
	return axios.post(url.CANCEL_MEETING.replace("{uuid}", id), { reason }, getOptions());
}