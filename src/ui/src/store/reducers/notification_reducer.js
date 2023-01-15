import {
	ERROR_GLOBAL,
	SUCCESS_GLOBAL,
	CLEAR_NOTIFICATION_GLOBAL
} from "../types";

export default function notificationReducer(state = {}, action) {
	switch (action.type) {
		case ERROR_GLOBAL:
			return { type: 'error', ...action.payload };
		case SUCCESS_GLOBAL:
			return { type: 'error', ...action.payload };
		case CLEAR_NOTIFICATION_GLOBAL:
			return {};
		default:
			return state;
	}
}
