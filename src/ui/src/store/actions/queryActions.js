import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const sendQuery = (values) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.post(`/api/v1/query`, values);
			dispatch(actions.querySuccess(response.data));
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

export const queryClear = () => {
	return async (dispatch) => {
		dispatch(actions.queryClear());
	};
};
