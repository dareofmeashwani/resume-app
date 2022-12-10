import { ENV } from "../utils/constants";
import development from "./development";
import production from "./production";
const env = process.env.ENV === ENV.prod ? production : development;

export default {
	DB_HOSTNAME: env.DB_HOSTNAME,
	DB_PASSWORD: env.DB_PASSWORD,
	DB_NAME: env.DB_NAME,
	DB_USERNAME: env.DB_USERNAME,
	PRIVATE_KEY: env.PRIVATE_KEY,
	PRIVATE_KEY2: env.PRIVATE_KEY2,
	SESSION_EXPIRY: env.SESSION_EXPIRY,
	PORT: env.PORT || "3000",
	HASH_SALT: env.HASH_SALT || "12",
	DOMAIN: env.DOMAIN,
	ENV: env.ENV,
	EMAIL: env.EMAIL,
	EMAIL_PASSWORD: env.EMAIL_PASSWORD,
	ADMIN_EMAIL: env.ADMIN_EMAIL,
	GOOGLE_CLIENT_EMAIL: env.GOOGLE_CLIENT_EMAIL,
	GOOGLE_CLIENT_KEY: env.GOOGLE_CLIENT_KEY.split(String.raw`\n`).join("\n")
};
