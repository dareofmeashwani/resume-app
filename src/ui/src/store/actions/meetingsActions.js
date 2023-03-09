import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getMeetingStatus = (timestamp) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const meetingsStatus = await axios.post(`/api/v1/meetingsStatus?timestamp=${timestamp}`).data;
			dispatch(actions.authUser(meetingsStatus));
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
			const meetings = await axios.post(`/api/v1/meetings?limit=100`).data;
			dispatch(actions.authUser(meetings));
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
		dispatch(actions.clearMeetingsList());
	};
};