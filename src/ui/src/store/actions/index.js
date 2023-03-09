import {
	ERROR_GLOBAL,
	SUCCESS_GLOBAL,
	AUTH_USER,
	SIGN_OUT,
	CHANGE_USER_EMAIL,
	UPDATE_USER_PROFILE,
	VERIFY_EMAIL,
	VERIFY_FORGET_PASSWORD,
	CLEAR_NOTIFICATION_GLOBAL,
	FORGET_PASSWORD,
	SET_BUSY_INDICATOR_GLOBAL,
	RESET_BUSY_INDICATOR_GLOBAL,
	CLEAR_BUSY_INDICATOR_GLOBAL,
	QUERY_SUCCESS,
	QUERY_FAILURE,
	CLEAR_QUERY,
	QUERY_ALL,
	DOWNLOADS_LINKS,
	IMAGES_LINKS,
	EDUCATIONS_LIST,
	EDUCATIONS_CLEAR,
	EXTRA_CURRICULARS_CLEAR,
	EXTRA_CURRICULARS_LIST,
	PROJECTS_LIST,
	PROJECTS_CLEAR,
	RESPONSIBILITIES_CLEAR,
	RESPONSIBILITIES_LIST,
	SKILLS_CLEAR,
	SKILLS_LIST,
	TRAININGS_LIST,
	TRAININGS_CLEAR,
	WORK_EXPERIENCES_CLEAR,
	WORK_EXPERIENCES_LIST,
	MEETINGS_STATUS_LIST,
	MEETINGS_STATUS_LIST_CLEAR,
	MEETINGS_LIST,
	MEETINGS_LIST_CLEAR,
	MEETING_DETAIl,
	MEETING_DETAIL_CLEAR,
} from "../types";

/////// notification /////////////

export const errorGlobal = (msg) => {
	if (typeof (msg) === "string") {
		msg = {
			message: msg
		}
	}
	return {
		type: ERROR_GLOBAL,
		payload: msg
	}
};

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

/////// query /////////////

export const querySuccess = (data) => ({
	type: QUERY_SUCCESS,
	payload: data
});

export const queryFailure = (data) => ({
	type: QUERY_FAILURE,
	payload: data
});

export const queryClear = () => ({
	type: CLEAR_QUERY
});

export const queryList = (data) => ({
	type: QUERY_ALL,
	payload: data
});

/////// downloads /////////////

export const downloadableLinks = (data) => ({
	type: DOWNLOADS_LINKS,
	payload: data
});

/////// images /////////////

export const imagesLinks = (data) => ({
	type: IMAGES_LINKS,
	payload: data
});

/////// educations /////////////

export const educationsList = (data) => ({
	type: EDUCATIONS_LIST,
	payload: data
});

export const educationsClear = () => ({
	type: EDUCATIONS_CLEAR,
});

/////// extraCurriculars /////////////

export const extraCurricularsList = (data) => ({
	type: EXTRA_CURRICULARS_LIST,
	payload: data
});

export const extraCurricularsClear = () => ({
	type: EXTRA_CURRICULARS_CLEAR,
});

/////// skills /////////////

export const projectsList = (data) => ({
	type: PROJECTS_LIST,
	payload: data
});

export const projectsClear = () => ({
	type: PROJECTS_CLEAR,
});

/////// responsibilities /////////////

export const responsibilitiesList = (data) => ({
	type: RESPONSIBILITIES_LIST,
	payload: data
});

export const responsibilitiesClear = () => ({
	type: RESPONSIBILITIES_CLEAR,
});

/////// skills /////////////

export const skillsList = (data) => ({
	type: SKILLS_LIST,
	payload: data
});

export const skillsClear = () => ({
	type: SKILLS_CLEAR,
});

/////// trainings /////////////

export const trainingsList = (data) => ({
	type: TRAININGS_LIST,
	payload: data
});

export const trainingsClear = () => ({
	type: TRAININGS_CLEAR,
});

/////// work experiences /////////////

export const workExperiencesList = (data) => ({
	type: WORK_EXPERIENCES_LIST,
	payload: data
});

export const workExperiencesClear = () => ({
	type: WORK_EXPERIENCES_CLEAR,
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

export const verifyForgetPassword = (data) => ({
	type: VERIFY_FORGET_PASSWORD,
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

export const emailVerify = (payload) => ({
	type: VERIFY_EMAIL,
	payload
});

/////// meetings /////////////

export const meetingsStatus = (payload) => ({
	type: MEETINGS_STATUS_LIST,
	payload,
});

export const clearMeetingsStatus = () => ({
	type: MEETINGS_STATUS_LIST_CLEAR,
	payload: null
});

export const meetingsList = (payload) => ({
	type: MEETINGS_LIST,
	payload,
});

export const clearMeetingList = () => ({
	type: MEETINGS_LIST_CLEAR,
	payload: null
});

export const meetingsDetail = (payload) => ({
	type: MEETING_DETAIl,
	payload,
});

export const clearMeetingsDetail = () => ({
	type: MEETING_DETAIL_CLEAR,
	payload: null
});