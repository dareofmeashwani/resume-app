import { DOWNLOADS_LINKS } from "../types";

export default function notificationReducer(state = {}, action) {
	switch (action.type) {
		case DOWNLOADS_LINKS:
			return { ...state, data: action.payload };
		default:
			return state;
	}
}
