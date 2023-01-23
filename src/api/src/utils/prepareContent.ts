import { Dropbox } from "dropbox";
import config from "../config";
import * as path from "path";
import fs from "fs";
async function downloadFile(dbx: Dropbox, filepath: string) {
	return new Promise<any>((resolve, reject) => {
		const localPath = path.join(__dirname, path.join("../", filepath));
		if (fs.existsSync(localPath)) {
			resolve(null);
			return;
		}
		return dbx
			.filesDownload({ path: filepath })
			.then(function (response: any) {
				if (response.result.fileBinary !== undefined) {
					fs.writeFile(
						localPath,
						response.result.fileBinary,
						"binary",
						function (err: any) {
							if (err) {
								console.log(err);
								reject(err);
							}
							console.log(filepath + " : " + localPath);
							resolve(null);
						}
					);
				}
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
	});
}

async function downloadFolder(dbx: Dropbox, folder: string) {
	fs.mkdirSync(path.join(__dirname, path.join("../", folder)), {
		recursive: true
	});
	let response = await dbx.filesListFolder({ path: "/" + folder });
	await response.result.entries.map((fileMeta: any) =>
		downloadFile(dbx, fileMeta.path_display)
	);
}

export default async function downloadContent() {
	var dbx = new Dropbox({ accessToken: config.DROPBOX_ACCESS_TOKEN });
	await downloadFolder(dbx, "downloads");
	await downloadFolder(dbx, "images");
	console.log("Serving Content downloaded successfully");
}
