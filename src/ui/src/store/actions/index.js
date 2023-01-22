import {
	ERROR_GLOBAL,
	SUCCESS_GLOBAL,
	AUTH_USER,
	SIGN_OUT,
	CHANGE_USER_EMAIL,
	UPDATE_USER_PROFILE,
	VERIFY_EMAIL,
	VERIFY_MOBILE,
	CLEAR_NOTIFICATION_GLOBAL,
	FORGET_PASSWORD,
	SET_BUSY_INDICATOR_GLOBAL,
	RESET_BUSY_INDICATOR_GLOBAL,
	CLEAR_BUSY_INDICATOR_GLOBAL
} from "../types";

/////// notification /////////////

export const errorGlobal = (msg) => ({
	type: ERROR_GLOBAL,
	payload: msg
});

export const successGlobal = (msg) => ({
	type: SUCCESS_GLOBAL,
	payload: msg
});

export const clearGlobalNotifications = (msg) => ({
	type: CLEAR_NOTIFICATION_GLOBAL,
	payload: msg
});

/////// busy indicator /////////////

export const setBusyIndicator = () => ({
	type: SET_BUSY_INDICATOR_GLOBAL
});

export const resetBusyIndicator = () => ({
	type: RESET_BUSY_INDICATOR_GLOBAL
});

export const clearBusyIndicator = () => ({
	type: CLEAR_BUSY_INDICATOR_GLOBAL
});

/////// users /////////////

export const authUser = (user) => ({
	type: AUTH_USER,
	payload: user
});

export const signOut = () => ({
	type: SIGN_OUT
});

export const forgetPassword = (data) => ({
	type: FORGET_PASSWORD,
	payload: data
});

export const changeUserEmail = (data) => ({
	type: CHANGE_USER_EMAIL,
	payload: data
});

export const updateUserProfile = (userdata) => ({
	type: UPDATE_USER_PROFILE,
	payload: userdata
});

export const emailVerify = () => ({
	type: VERIFY_EMAIL
});

export const mobileVerify = () => ({
	type: VERIFY_MOBILE
});
