import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getProjectsList = (status) => {
	status = status || "public";
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/projects?status=${status}`);
			dispatch(actions.projectsList(response.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal({
					...error.response.data
				})
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const clearProjects = () => {
	return async (dispatch) => {
		dispatch(actions.projectsClear());
	};
};
