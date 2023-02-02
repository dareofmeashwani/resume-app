import {
	WORK_EXPERIENCES_LIST,
	WORK_EXPERIENCES_CLEAR,
} from "../types";

export default function reducer(state = {}, action) {
	switch (action.type) {
		case WORK_EXPERIENCES_LIST:
			return { ...state, data: action.payload };
		case WORK_EXPERIENCES_CLEAR:
			return {};
		default:
			return state;
	}
}
