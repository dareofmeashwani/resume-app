import {
	SKILLS_LIST,
	SKILLS_CLEAR,
} from "../types";

export default function reducer(state = {}, action) {
	switch (action.type) {
		case SKILLS_LIST:
			return { ...state, data: action.payload };
		case SKILLS_CLEAR:
			return {};
		default:
			return state;
	}
}
