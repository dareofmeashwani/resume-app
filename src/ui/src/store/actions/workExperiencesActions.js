import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getWorkExperiencesList = (status) => {
	status = status || "public";
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/workExperiences?status=${status}`);
			dispatch(actions.workExperiencesList(response.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const clearWorkExperiences = () => {
	return async (dispatch) => {
		dispatch(actions.workExperiencesClear());
	};
};
