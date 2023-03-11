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
export const getMeetingList = (timestamp) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/meetings?limit=100&sort=desc`);
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