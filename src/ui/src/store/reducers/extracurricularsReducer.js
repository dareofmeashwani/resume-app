import {
	EXTRA_CURRICULARS_LIST,
	EXTRA_CURRICULARS_CLEAR,
} from "../types";

export default function reducer(state = {}, action) {
	switch (action.type) {
		case EXTRA_CURRICULARS_LIST:
			return { ...state, data: action.payload };
		case EXTRA_CURRICULARS_CLEAR:
			return {};
		default:
			return state;
	}
}
