import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getTrainingsList = (status) => {
	status = status || "public";
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/trainings?status=${status}`);
			dispatch(actions.trainingsList(response.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const clearTrainings = () => {
	return async (dispatch) => {
		dispatch(actions.trainingsClear());
	};
};
