import { IMAGES_LINKS } from "../types";

export default function notificationReducer(state = {}, action) {
	switch (action.type) {
		case IMAGES_LINKS:
			return { ...state, data: action.payload };
		default:
			return state;
	}
}
