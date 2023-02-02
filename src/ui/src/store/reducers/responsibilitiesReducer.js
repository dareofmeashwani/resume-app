import {
	RESPONSIBILITIES_LIST,
	RESPONSIBILITIES_CLEAR,
} from "../types";

export default function reducer(state = {}, action) {
	switch (action.type) {
		case RESPONSIBILITIES_LIST:
			return { ...state, data: action.payload };
		case RESPONSIBILITIES_CLEAR:
			return {};
		default:
			return state;
	}
}
