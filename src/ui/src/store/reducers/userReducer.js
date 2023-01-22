import {
	AUTH_USER,
	SIGN_OUT,
	CHANGE_USER_EMAIL,
	UPDATE_USER_PROFILE,
	VERIFY_EMAIL,
	FORGET_PASSWORD
} from "../types";

let DEFAULT_USER_STATE = {
	user: null,
};

export default function usersReducer(state = DEFAULT_USER_STATE, action) {
	switch (action.type) {
		case AUTH_USER:
			return {
				...state,
				user: {
					...action.payload,
					name: action.payload.firstname + " " + action.payload.lastname
				},
			};
		case FORGET_PASSWORD:
			return { ...state, forgetPasswordMessage: action.payload };
		case SIGN_OUT:
			return { user: null };
		case CHANGE_USER_EMAIL:
			return { ...state, data: { ...state.data, email: action.payload } };
		case UPDATE_USER_PROFILE:
			return { ...state, data: { ...action.payload } };
		case VERIFY_EMAIL:
			return { ...state, data: { ...state.data, verified: true } };
		default:
			return state;
	}
}
