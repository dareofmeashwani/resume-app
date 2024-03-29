import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getEducationsList = (status) => {
	status = status || "public";
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/educations?status=${status}`);
			dispatch(actions.educationsList(response.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const clearEducations = () => {
	return async (dispatch) => {
		dispatch(actions.educationsClear());
	};
};
