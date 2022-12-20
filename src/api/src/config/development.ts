import fs from "fs";
import path from "path";
const env: any = {};
fs
	.readFileSync(path.join(__dirname, "../../../../.env_dev"), "utf-8")
	.split(/\r?\n/)
	.forEach(function (line) {
		const equalIndex = line.indexOf("=");
		if (equalIndex == -1) {
			throw Error("Invalid config file");
		}
		const key = line.substring(0, equalIndex);
		const value = line.substring(equalIndex + 1);
		env[key.trim()] = value.trim();
	});
export default env;
