import {
	EDUCATIONS_LIST,
	EDUCATIONS_CLEAR,
} from "../types";

export default function reducer(state = {}, action) {
	switch (action.type) {
		case EDUCATIONS_LIST:
			return { ...state, data: action.payload };
		case EDUCATIONS_CLEAR:
			return {};
		default:
			return state;
	}
}
