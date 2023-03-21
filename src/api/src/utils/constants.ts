export const SESSION_ID = "session_id";
export const SESSION_COLLECTION = "resume-sessions";
export const ERROR_MESSAGES = {
	SPEC_VALIDATION_FAILED: {
		code: "1000001",
		message: "The email or password that you've entered is incorrect"
	},
	GENERIC_ERROR: {
		code: "1000002",
		message: "Something went wrong, please try again later."
	},
	DB_CONNECTIVITY_ERROR: {
		code: "1000003",
		message: "Unable to perform DB operation, please try again later."
	},
	EMAIL_ALREADY_IN_USE: {
		code: "1000004",
		message: "Email address already linked to another account, please try login."
	},
	INVALID_EMAIL: {
		code: "1000005",
		message: "Invalid email address, please try with valid email address."
	},
	INVALID_MOBILE: {
		code: "1000006",
		message: "Invalid mobile, please provide the valid mobile number."
	},
	UNAUTHORIZED: {
		code: "1000007",
		message: "Not enough permission to access this resource."
	},
	LOGOUT_ERROR: {
		code: "1000008",
		message: "Unable to logout at this time, please try again later"
	},
	LOGIN_ERROR: {
		code: "1000009",
		message: "Unable to Login at this time, please try again later"
	},
	INVALID_TOKEN: {
		code: "1000010",
		message: "Invalid Token or Token Expired"
	},
	INVALID_OPERATION: {
		code: "1000011",
		message: "Operation not allowed"
	},
	UNVERIFIED_EMAIL_ERROR: {
		code: "1000012",
		message: "Please verfiy your email, then try again your action"
	},
	ZOOM_CONNECTIVITY_ERROR: {
		code: "1000013",
		message: "Please try again later, unable to process your request at this time"
	},
	NOT_FOUND_ERROR: {
		code: "1000014",
		message: "The resource, you are trying to access does not exist"
	},
	INVALID_CREDENTIALS: {
		code: "1000015",
		message: "The email or password that you've entered is incorrect"
	}
};

export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
	SERVICE_UNAVAILABLE: 503
};

export const ROLES = {
	USER: "USER",
	ADMIN: "ADMIN"
};

export const ENV = {
	DEV: "development",
	prod: "production"
};

export const TOKEN_TYPES = {
	EMAIL: "email_token",
	FORGET_PASSWORD: "forget_password"
};

export const MESSAGES = {
	FORGET_PASSWORD:
		"Password reset link has been sent to your email, Please follow the link & reset your account password.",
	EMAIL_VERIFIED: "Your email has been successfully verified",
	EMAIL_VERIFCATION_MAIL_SEND: "Email verification link has been sent to your email, Please follow the link & verify your email.",
	FORGET_PASSWORD_SUCCESS: "Your password has been changed successfully",
	VALID_TOKEN: "Token provided by you is valid, please proceed further",
	MEETING_NOTI_SEND: "Meeting Invites Send.",
	CHANGE_PASSWORD_SUCCESS: "Your password has successfully updated."
};

export const query = {
	sort: {
		default: "desc",
		key: "sort",
		type: String
	},
	sortBy: {
		default: "createdAt",
		key: "sortBy",
		type: String
	},
	listType: {
		default: "all",
		key: "listType",
		type: String
	},
	limit: {
		key: "limit",
		type: Number,
		default: 25
	},
	page: {
		key: "page",
		type: Number,
		default: 0
	},
	status: {
		key: "status",
		type: String,
		default: "all"
	}
}