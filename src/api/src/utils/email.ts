import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import config from "../config";
import { Query } from "mongoose";

let transporter = nodemailer.createTransport({
	service: "Gmail",
	secure: true,
	auth: {
		user: config.EMAIL,
		pass: config.EMAIL_PASSWORD
	}
});

export const sendWelcomeEmail = async (
	userEmail: string,
) => {
	try {
		let mailGenerator = new Mailgen({
			theme: "default",
			product: {
				name: config.DOMAIN,
				link: `${config.DOMAIN}`
			}
		});

		const email = {
			body: {
				name: userEmail,
				intro:
					`Welcome to ${config.DOMAIN}! We're very excited to have you on board.`,
				outro:
					"Need help, or have questions? Just reply to this email, we'd love to help."
			}
		};

		let emailBody = mailGenerator.generate(email);
		let message = {
			from: config.EMAIL,
			to: userEmail,
			subject: `Welcome to ${config.DOMAIN}`,
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
	userEmail: string,
	emailToken: string
) => {
	try {
		let mailGenerator = new Mailgen({
			theme: "default",
			product: {
				name: config.DOMAIN,
				link: `${config.DOMAIN}`
			}
		});

		const email = {
			body: {
				name: userEmail,
				action: {
					instructions: "To get validate your account, please click here:",
					
					button: {
						color: "#1a73e8",
						text: "Validate your account",
						link: `${config.DOMAIN}/user/verification?t=${emailToken}`
					}
				},
				outro:
					"Need help, or have questions? Just reply to this email, we'd love to help."
			}
		};

		let emailBody = mailGenerator.generate(email);
		let message = {
			from: config.EMAIL,
			to: userEmail,
			subject: `Activate your ${config.DOMAIN} account`,
			html: emailBody
		};

		await transporter.sendMail(message);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const sendQueryNotificationToAdmin = async (
	query: any,
) => {
	try {
		let mailGenerator = new Mailgen({
			theme: "default",
			product: {
				name: config.DOMAIN,
				link: `${config.DOMAIN}`
			}
		});

		const email = {
			body: {
				dictionary: {
					Date: query.createdAt,
					Sender: query.name,
					Subject: query.subject,
					Mobile: query.mobile,
					Email: query.email,
					Description: query.description,
				}
			}
		};

		let emailBody = mailGenerator.generate(email);
		let message = {
			from: config.EMAIL,
			to: config.ADMIN_EMAIL,
			subject: `#### Query from ${query.name} ${query.email} ####`,
			html: emailBody
		};

		await transporter.sendMail(message);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

