import * as actions from "./index";
import axios from "axios";
import getText from "../../messages";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getMeetingList = (listType, sort, sortBy) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/meetings?listType=${listType}&sort=${sort||"asc"}&sortBy=${sortBy}`);
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

export const cancelMeetingInvite = (meetingId) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			await axios.post(`/api/v1/meetings/cancelInvite?meetingId=${meetingId}`);
			dispatch(actions.clearMeetingList());
			dispatch(actions.successGlobal({message: getText("meetingCancelNoti")}));
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
			const response = await axios.post(`/api/v1/meetings/resendInvite?meetingId=${meetingId}`);
			dispatch(actions.successGlobal(response.data))
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};