import {
	SET_BUSY_INDICATOR_GLOBAL,
	CLEAR_BUSY_INDICATOR_GLOBAL,
	RESET_BUSY_INDICATOR_GLOBAL
} from "../types";

export default function notificationReducer(state = { count: 0 }, action) {
	switch (action.type) {
		case SET_BUSY_INDICATOR_GLOBAL:
			return { count: state.count + 1 };
		case RESET_BUSY_INDICATOR_GLOBAL:
			return { count: state.count - 1 };
		case CLEAR_BUSY_INDICATOR_GLOBAL:
			return { count: 0 };
		default:
			return state;
	}
}
