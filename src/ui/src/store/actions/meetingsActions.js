import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getMeetingStatus = (timestamp) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/meetingsStatus?timestamp=${timestamp}`);
			dispatch(actions.meetingsStatus(response.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};


export const clearMeetingsStatus = () => {
	return async (dispatch) => {
		dispatch(actions.clearMeetingsStatus());
	};
};
export const getMeetingList = (listType) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/meetings?listType=${listType}`);
			dispatch(actions.meetingsList(response.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};


export const clearMeetingsList = () => {
	return async (dispatch) => {
		dispatch(actions.clearMeetingList());
	};
};

export const deleteMeeting = (meetingId) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			await axios.delete(`/api/v1/meetings/${meetingId}`);
			dispatch(actions.clearMeetingList());
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const resendMeetingInvite = (meetingId) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.post(`/api/v1/meetings/${meetingId}/resendInvite`);
			dispatch(actions.successGlobal(response.data))
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const patchMeeting = (meetingId, payload) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			await axios.patch(`/api/v1/meetings/${meetingId}`, payload);
			dispatch(actions.clearMeetingList());
			dispatch(actions.clearMeetingsStatus());
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const createMeeting = (payload) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			await axios.post(`/api/v1/meetings`, payload);
			dispatch(actions.clearMeetingList());
			dispatch(actions.clearMeetingsStatus());
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};