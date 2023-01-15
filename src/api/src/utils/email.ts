import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import config from "../config";
import moment from "moment";
import { User } from "../models/userModel";
import { ROLES } from "./constants";

let transporter = nodemailer.createTransport({
	service: "Gmail",
	secure: true,
	auth: {
		user: config.EMAIL,
		pass: config.EMAIL_PASSWORD
	}
});

const THEME = "salted";

export const sendWelcomeEmail = async (userInfo: any) => {
	try {
		let mailGenerator = new Mailgen({
			theme: THEME,
			product: {
				name: config.DOMAIN_NAME,
				link: `${config.DOMAIN_ADDRESS}`
			}
		});

		const email = {
			body: {
				name: userInfo.firstname + " " + userInfo.lastname,
				intro: `Welcome to ${config.DOMAIN_NAME}! We're very excited to have you on board.`,
				outro:
					"Need help, or have questions? Just reply to this email, we'd love to help."
			}
		};

		let emailBody = mailGenerator.generate(email);
		let message = {
			from: config.EMAIL,
			to: userInfo.email,
			subject: `Welcome to ${config.DOMAIN_NAME}`,
			html: emailBody
		};

		await transporter.sendMail(message);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const sendVerificationEmail = async (
	userInfo: any,
	emailToken: string
) => {
	try {
		let mailGenerator = new Mailgen({
			theme: THEME,
			product: {
				name: config.DOMAIN_NAME,
				link: `${config.DOMAIN_ADDRESS}`
			}
		});
		const email = {
			body: {
				name: userInfo.firstname + " " + userInfo.lastname,
				action: {
					instructions: "To get validate your account, please click here:",

					button: {
						color: "#1a73e8",
						text: "Validate your account",
						link: `${config.DOMAIN_ADDRESS}/user/verification?t=${emailToken}`
					}
				},
				outro:
					"Need help, or have questions? Just reply to this email, we'd love to help."
			}
		};

		let emailBody = mailGenerator.generate(email);
		let message = {
			from: config.EMAIL,
			to: userInfo.email,
			subject: `Activate your ${config.DOMAIN_NAME} account`,
			html: emailBody
		};

		await transporter.sendMail(message);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const sendForgetPasswordEmail = async (
	userInfo: any,
	token: string
) => {
	try {
		let mailGenerator = new Mailgen({
			theme: THEME,
			product: {
				name: config.DOMAIN_NAME,
				link: `${config.DOMAIN_ADDRESS}`
			}
		});
		const email = {
			body: {
				name: userInfo.firstname + " " + userInfo.lastname,
				action: {
					instructions: "To reset your account password, please click here:",

					button: {
						color: "#1a73e8",
						text: "Reset your account",
						link: `${config.DOMAIN_ADDRESS}/user/forgetPassword?t=${token}`
					}
				},
				outro:
					"Need help, or have questions? Just reply to this email, we'd love to help."
			}
		};

		let emailBody = mailGenerator.generate(email);
		let message = {
			from: config.EMAIL,
			to: userInfo.email,
			subject: `Activate your ${config.DOMAIN_NAME} account`,
			html: emailBody
		};

		await transporter.sendMail(message);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const sendQueryNotificationToAdmin = async (query: any) => {
	const admins = await User.find({ role: ROLES.ADMIN });
	if (!admins) {
		return false;
	}
	let mailGenerator = new Mailgen({
		theme: THEME,
		product: {
			name: config.DOMAIN_NAME,
			link: `${config.DOMAIN_ADDRESS}`
		}
	});
	try {
		await Promise.all(
			admins.map(async (admin) => {
				const email = {
					body: {
						dictionary: {
							Date: query.createdAt,
							Sender: query.name,
							Subject: query.subject,
							Mobile: query.mobile,
							Email: query.email,
							Description: query.description
						}
					}
				};
				let emailBody = mailGenerator.generate(email);
				let message = {
					from: config.EMAIL,
					to: admin.email,
					subject: `#### Query from ${query.name} ${query.email} ####`,
					html: emailBody
				};
				return await transporter.sendMail(message);
			})
		);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

const sendZoomMeeting = async (
	userInfo: any,
	emails: string[],
	meeting: any,
	subject: string
) => {
	try {
		let mailGenerator = new Mailgen({
			theme: THEME,
			product: {
				name: config.DOMAIN_NAME,
				link: `${config.DOMAIN_ADDRESS}`
			}
		});
		const intro = [
			"Meeting Topic : " + meeting.topic,
			"Meeting Agenda : " + meeting.agenda,
			"Meeting Organiser : " + userInfo.firstname + " " + userInfo.lastname,
			"Meeting Timing : " +
				moment(meeting.start_time).format("MM/DD/YYYY h:mm a ") +
				" IST",
			"Meeting With : " + config.DOMAIN_NAME
		];
		await Promise.all(
			emails.map(async (userEmail: string) => {
				const email = {
					body: {
						name: userEmail,
						intro,
						action: {
							instructions: "Please click the Below button to join meeting",
							button: {
								color: "#33DAFF",
								text: "Join Meeting",
								link: meeting.start_url
							}
						},
						outro: [
							"Incase button doesn't work, follow the link to join the meeting" +
								" " +
								meeting.start_url,
							"Need help, or have questions? Just reply to this email, we'd love to help."
						]
					}
				};
				let emailBody = mailGenerator.generate(email);
				let message = {
					from: config.EMAIL,
					to: userEmail,
					subject,
					html: emailBody
				};
				return await transporter.sendMail(message);
			})
		);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
export const sendZoomInvite = async (
	userInfo: any,
	emails: string[],
	meeting: any
) => {
	sendZoomMeeting(
		userInfo,
		emails,
		meeting,
		`Zoom Meeting with ${config.DOMAIN_NAME}`
	);
};
export const sendZoomUpdate = async (
	userInfo: any,
	emails: string[],
	meeting: any
) => {
	sendZoomMeeting(
		userInfo,
		emails,
		meeting,
		`Your Zoom Meeting with ${config.DOMAIN_NAME} has been updated`
	);
};
export const sendZoomCancellation = async (
	userInfo: any,
	emails: string[],
	meeting: any
) => {
	try {
		let mailGenerator = new Mailgen({
			theme: THEME,
			product: {
				name: config.DOMAIN_NAME,
				link: `${config.DOMAIN_ADDRESS}`
			}
		});
		await Promise.all(
			emails.map(async (userEmail: string) => {
				const email = {
					body: {
						name: userEmail,
						intro: [
							"Meeting Topic : " + meeting.topic,
							"Meeting Agenda : " + meeting.agenda,
							"Meeting Organiser : " + userInfo.firstname + " " + userInfo.lastname,
							"Meeting Timing : " +
								moment(meeting.start_time).format("MM/DD/YYYY h:mm a ") +
								" IST",
							"Meeting With : " + config.DOMAIN_NAME
						],
						outro:
							"Need help, or have questions? Just reply to this email, we'd love to help."
					}
				};
				let emailBody = mailGenerator.generate(email);
				let message = {
					from: config.EMAIL,
					to: userEmail,
					subject: `Zoom Meeting with ${config.DOMAIN_NAME} has been cancelled`,
					html: emailBody
				};
				return await transporter.sendMail(message);
			})
		);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
