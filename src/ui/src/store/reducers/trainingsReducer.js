import {
	TRAININGS_LIST,
	TRAININGS_CLEAR,
} from "../types";

export default function reducer(state = {}, action) {
	switch (action.type) {
		case TRAININGS_LIST:
			return { ...state, data: action.payload };
		case TRAININGS_CLEAR:
			return {};
		default:
			return state;
	}
}
