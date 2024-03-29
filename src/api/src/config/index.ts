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
	TOKEN_EXPIRY: env.TOKEN_EXPIRY,
	PORT: env.PORT || "3001",
	HASH_SALT: env.HASH_SALT || "12",
	DOMAIN_NAME: env.DOMAIN_NAME,
	DOMAIN_ADDRESS: env.DOMAIN_ADDRESS,
	ENV: env.ENV,
	EMAIL: env.EMAIL,
	EMAIL_PASSWORD: env.EMAIL_PASSWORD,
	CALENDLY_TOKEN: env.CALENDLY_TOKEN,
	CONTENT_URL: env.CONTENT_URL,
	CALENDLY_SIGNING_KEY: env.CALENDLY_SIGNING_KEY
};
