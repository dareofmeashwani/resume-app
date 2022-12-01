export const SESSION_ID = "session_id";
export const SESSION_COLLECTION =  "resume-sessions";
export const MESSAGES = {
    INVALID_CREDENTIALS: {
        code: 1000001,
        message: "The email address and password is not matching with any account"
    },
    GENERIC_ERROR: {
        code: 1000002,
        message: "Something went wrong, please try again later."
    },
    DB_CONNECTIVITY_ERROR: {
        code: 1000003,
        message: "Unable to perform DB operation, please try again later."
    },
    EMAIL_ALREADY_IN_USE: {
        code: 1000004,
        message: "Email address already linked to another account, please try login."
    },
    INVALID_EMAIL: {
        code: 1000005,
        message: "Invalid email address, please try with valid email address."
    },
    INVALID_MOBILE: {
        code: 1000006,
        message: "Invalid mobile, please provide the valid mobile number."
    },
    UNAUTHORIZED:{
        code: 1000007,
        message: "Not enough permission to access this resource."
    },
    LOGOUT_ERROR:{
        code: 1000008,
        message: "Unable to logout at this time, please try again later"
    },
    LOGIN_ERROR:{
        code: 1000009,
        message: "Unable to Login at this time, please try again later"
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