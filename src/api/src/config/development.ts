import fs from "fs";
import path from "path";
const env: any = {};
try {
	fs
		.readFileSync(path.join(__dirname, "../../../../.env_dev"), "utf-8")
		.split(/\r?\n/)
		.forEach(function (line) {
			const equalIndex = line.indexOf("=");
			const key = line.substring(0, equalIndex);
			const value = line.substring(equalIndex + 1);
			env[key.trim()] = value.trim();
		});
} catch (error) {
	console.log("dev env not present");
}
export default env;
