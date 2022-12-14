import mongoose from "mongoose";
export function filterProps(source: any, ignore: any, change?: any) {
	let res = {};
	Object.keys(source).forEach((key: string) => {
		if (ignore.indexOf(key) > -1) {
			return;
		}
		let value = source[key];
		if (source[key] instanceof mongoose.Types.ObjectId) {
			value = source[key].toString();
		}
		if (change && change[key]) {
			key = change[key];
		}
		(res as any)[key] = value;
	});
	return res;
}

export function getWeekStartEnd(selectedDate: Date | undefined) {
	selectedDate = selectedDate || new Date();
	let first = selectedDate.getDate() - selectedDate.getDay();
	let last = first + 6;

	let firstday = new Date(
		new Date(selectedDate.setDate(first + 1)).setHours(0, 0, 0, 0)
	);
	let lastday = new Date(
		new Date(selectedDate.setDate(last)).setHours(23, 59, 59, 999)
	);
	return {
		start: firstday,
		end: lastday
	};
}

export function unique(dataArray: any[], lookUpkey?: string) {
	const set = new Set();
	lookUpkey = lookUpkey || "id";
	return dataArray.filter((value: any) => {
		if (typeof value === "object") {
			value = value[lookUpkey as string];
		}
		if (set.has(value)) {
			return false;
		}
		set.add(value);
		return true;
	});
}

export function generateRandom(length: number) {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
