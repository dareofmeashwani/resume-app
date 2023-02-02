import {
	PROJECTS_LIST,
	PROJECTS_CLEAR,
} from "../types";

export default function reducer(state = {}, action) {
	switch (action.type) {
		case PROJECTS_LIST:
			return { ...state, data: action.payload };
		case PROJECTS_CLEAR:
			return {};
		default:
			return state;
	}
}
