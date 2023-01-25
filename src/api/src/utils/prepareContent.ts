import config from "../config";
import fs from "fs";
import https from "https";
import path from "path";
import admZip from "adm-zip";
import axios from "axios";
function downloadFile(url: string, filename: string) {
	const file = fs.createWriteStream(filename);
	return new Promise((resolve, reject) => {
		const download = (url: string) => {
			axios
				.get(url, { responseType: "stream" })
				.then((response: any) => {
					if (response.statusCode == 302) {
						download(response.headers.location);
					} else {
						response.data.pipe(file);
						file.on("finish", () => {
							file.close(() => {
								console.log("Download Completed");
								resolve(null);
							});
						});
					}
				})
				.catch((err) => {
					reject(err);
				});
		};
		download(url);
	});
}
async function unzipFile(filename: string, targetDir: string = "./") {
	var zip = new admZip(filename);
	zip.extractAllTo(targetDir, true);
}
export default async function downloadContent() {
	const filePath = path.join(__dirname, "../temp.zip");
	console.log(filePath);
	await downloadFile(config.CONTENT_URL, filePath);
	unzipFile(filePath,path.join(__dirname, "../"));
	fs.unlinkSync(filePath);
}
