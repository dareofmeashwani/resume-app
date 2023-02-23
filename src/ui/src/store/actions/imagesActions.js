import * as actions from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getImageList = () => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.get(`/api/v1/imagesList`);
			dispatch(actions.imagesLinks(response.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};