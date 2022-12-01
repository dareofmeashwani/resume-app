const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_USERNAME = process.env.DB_USERNAME as string;
const DB_HOSTNAME = process.env.DB_HOSTNAME as string;
const DB_NAME = process.env.DB_NAME as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const HASH_SALT = process.env.HASH_SALT as string;
const SESSION_EXPIRY = process.env.SESSION_EXPIRY as string;
const PORT = process.env.PORT as string;
const DOMAIN = process.env.DOMAIN as string;
const ENV = process.env.ENV as string;
export default {
    DB_HOSTNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_USERNAME,
    PRIVATE_KEY,
    SESSION_EXPIRY,
    PORT,
    HASH_SALT,
    DOMAIN,
    ENV
};
