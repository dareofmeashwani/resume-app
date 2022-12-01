import fs from "fs";
import path from "path";
const env:any = {};
fs.readFileSync(path.join(__dirname, "../../../../.env"), 'utf-8').split(/\r?\n/).forEach(function (line) {
    console.log(line);
    const [key, value] = line.split("=");
    env[key.trim()] = value.trim()
})
export default {
    DB_HOSTNAME: env.DB_HOSTNAME,
    DB_PASSWORD: env.DB_PASSWORD,
    DB_NAME: env.DB_NAME,
    DB_USERNAME: env.DB_USERNAME,
    PRIVATE_KEY: env.PRIVATE_KEY,
    SESSION_EXPIRY: env.SESSION_EXPIRY,
    PORT: env.PORT,
    HASH_SALT: env.HASH_SALT,
    DOMAIN: env.DOMAIN,
    ENV: env.ENV
};
