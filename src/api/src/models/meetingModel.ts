import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import validator from "validator";
import { HTTP_STATUS, MESSAGES } from "../utils/constants";
import { throwResumeError } from "../utils/resumeError";
const MeetingSchema = new mongoose.Schema({
	title: {
		type: String,
		maxLength: 100,
		trim: true
	},
	description: {
		type: String,
		maxLength: 500,
		trim: true
	},
	start: {
		type: Date,
		required: true
	},
	gEventId:{
		type: String,
		required: true
	},
	end: {
		type: Date,
		required: true
	},
	members: {
		type: Array,
		maxLength: 100,
		trim: true,
		validate(emails: string[]) {
			if (emails.some((email) => !validator.isEmail(email))) {
				throwResumeError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_EMAIL);
			}
		}
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	modifiedAt: {
		type: Date,
		default: Date.now
	}
});
MeetingSchema.plugin(mongooseAggregatePaginate);
const Meeting = mongoose.model("Meeting", MeetingSchema);
export default Meeting;
