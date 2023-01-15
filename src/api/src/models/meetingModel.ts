import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import validator from "validator";
import { HTTP_STATUS, ERROR_MESSAGES } from "../utils/constants";
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
	externalEventId: {
		type: String
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
				throwResumeError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_EMAIL);
			}
		}
	},
	createdBy: {
		type: String,
		required: true,
		trim: true
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
