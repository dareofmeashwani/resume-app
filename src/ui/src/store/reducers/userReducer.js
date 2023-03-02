import {
	AUTH_USER,
	SIGN_OUT,
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
		case VERIFY_EMAIL:
			return { ...state, emailVerify: { ...action.payload} };
		default:
			return state;
	}
}
