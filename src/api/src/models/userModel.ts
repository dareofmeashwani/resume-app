import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import config from "../config";
import { throwResumeError } from "../utils/errorHelper";
import { HTTP_STATUS, ERROR_MESSAGES, ROLES, TOKEN_TYPES } from "../utils/constants";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { generateToken, verifyToken } from "../utils/helpers";
import { constants } from "buffer";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value: string) {
			if (!validator.isEmail(value)) {
				throwResumeError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_EMAIL);
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
	createdAt: {
		type: Date,
		default: Date.now
	},
	modifiedAt: {
		type: Date,
		default: Date.now
	}
});

userSchema.pre("save", async function (next: any) {
	let user = this as any;
	if (user.isModified("password")) {
		const salt = await bcrypt.genSalt(Number(config.HASH_SALT));
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
	}
	next();
});

userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const user = this;
	const match = await bcrypt.compare(candidatePassword, user.password);
	return match;
};

userSchema.statics.emailTaken = async function (email: string) {
	const user = await this.findOne({ email });
	return user;
};

userSchema.methods.generateEmailVerificationToken = function () {
	return generateToken(this, TOKEN_TYPES.EMAIL);
};

userSchema.methods.generateForgetPasswordToken = function () {
	return generateToken(this, TOKEN_TYPES.FORGET_PASSWORD);
};

userSchema.statics.validateToken = function (token) {
	return verifyToken(token);
};

userSchema.plugin(mongooseAggregatePaginate);

const User = mongoose.model("User", userSchema);
export { User };
