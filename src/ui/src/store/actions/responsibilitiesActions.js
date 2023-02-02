import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getResponsibilitiesList = () => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/responsibilities`);
			dispatch(actions.responsibilitiesList(response.data));
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

export const clearResponsibilities = () => {
	return async (dispatch) => {
		dispatch(actions.responsibilitiesClear());
	};
};
