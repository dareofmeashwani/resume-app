import { QUERY_FAILURE, QUERY_SUCCESS, CLEAR_QUERY, QUERY_ALL } from "../types";

export default function notificationReducer(state = {}, action) {
	switch (action.type) {
		case QUERY_SUCCESS:
			return { ...state, type: "success", message: action.payload };
		case QUERY_FAILURE:
			return { ...state, type: "error", message: action.payload };
		case QUERY_ALL:
			return { ...state, data: action.payload };
		case CLEAR_QUERY:
			return {};
		default:
			return state;
	}
}
