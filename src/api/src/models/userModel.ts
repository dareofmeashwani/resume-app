import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import config from "../config";
import { throwResumeError } from "../utils/resumeError";
import { HTTP_STATUS, MESSAGES, ROLES } from "../utils/constants";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { date } from "express-openapi-validator/dist/framework/base.serdes";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value: string) {
			if (!validator.isEmail(value)) {
				throwResumeError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_EMAIL);
			}
		}
	},
	emailVerified: {
		type: Boolean,
		default: false
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	role: {
		type: String,
		enum: [ROLES.USER, ROLES.ADMIN],
		default: ROLES.USER
	},
	firstname: {
		type: String,
		maxLength: 100,
		trim: true,
		required: true
	},
	lastname: {
		type: String,
		maxLength: 100,
		trim: true,
		default: ""
	},
	gender: {
		type: String,
		maxLength: 50,
		required: true
	},
	dob: {
		type: Date,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	modifiedAt: {
		type: Date,
		default: Date.now
	},
	mobile: {
		type: String,
		maxLength: 13,
		required: true,
		validate(value: string) {
			if (!validator.isMobilePhone(value)) {
				throwResumeError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_MOBILE);
			}
		}
	},
	mobileVerified: {
		type: Boolean,
		default: false
	}
});

userSchema.pre("save", async function (next: any) {
	let user = this as any;
	if (user.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
	}
	next();
});

userSchema.methods.generateToken = function () {
	let user = this;
	const userObj = {
		_id: user._id.toHexString(),
		email: user.email
	};
	const token = jwt.sign(userObj, config.PRIVATE_KEY, {
		expiresIn: config.SESSION_EXPIRY
	});
	return token;
};

userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const user = this;
	const match = await bcrypt.compare(candidatePassword, user.password);
	return match;
};

userSchema.statics.emailTaken = async function (email: string) {
	const user = await this.findOne({ email });
	return !!user;
};

userSchema.methods.generateEmailActivationToken = function () {
	let user = this;
	const userObj = {
		email: user.email,
		timestamp: new Date().toISOString()
	};
	const token = jwt.sign(userObj, config.PRIVATE_KEY, { expiresIn: "1d" });
	return token;
};

userSchema.statics.validateToken = function(token){
    return jwt.verify(token, config.PRIVATE_KEY);
}

userSchema.plugin(mongooseAggregatePaginate);

const User = mongoose.model("User", userSchema);
export { User };
