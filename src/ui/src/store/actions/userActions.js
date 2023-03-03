import * as actions from "./index";
import axios from "axios";
import { removeCookieToken, getCookieToken } from "../../utils/cookie";
import { HTTP_STATUS } from "../../utils/constants";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const signInUser = (values) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const user = await axios.post(`/api/v1/user/login`, {
				email: values.email,
				password: values.password
			});
			dispatch(actions.authUser(user.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const signUpUser = (values) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const user = await axios.post(`/api/v1/user/register`, {
				email: values.email,
				password: values.password,
				firstname: values.firstname,
				lastname: values.lastname,
			});
			dispatch(actions.authUser(user.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const forgetUserPassword = (values) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.post(`/api/v1/user/forgetPassword`, {
				email: values.email
			});
			dispatch(actions.forgetPassword(response.data));
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const signOut = () => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			await axios.post(`/api/v1/user/logout`);
			dispatch(actions.signOut(null));
			removeCookieToken();
		} catch (error) {
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const isAuthUser = () => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			if (!getCookieToken()) {
				dispatch(actions.resetBusyIndicator());
				return;
			}
			const response = await axios.get(`/api/v1/user/isAuth`);
			dispatch(actions.authUser(response.data));
		} catch (error) {
			if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
				dispatch(actions.signOut());
				removeCookieToken();
			} else {
				dispatch(
					actions.errorGlobal(error.response.data)
				);
			}
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const verifyEmailVerification = (token) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.patch(`/api/v1/user/emailVerify`, {
				token,
			});
			dispatch(actions.emailVerify({ ...response.data, verified: true }));
		} catch (error) {
			dispatch(actions.emailVerify({ ...error.response.data, verified: false }));
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const verifyForgetPassword = (payload) => {
	return async (dispatch) => {
		dispatch(actions.setBusyIndicator());
		try {
			const response = await axios.patch(`/api/v1/user/verifyForgetPassword`, payload);
			dispatch(actions.verifyForgetPassword({ ...response.data, verified: true, isPasswordSend: !!payload.password }));
		} catch (error) {
			dispatch(actions.verifyForgetPassword({ ...error.response.data, verified: false, isPasswordSend: !!payload.password }));
			dispatch(
				actions.errorGlobal(error.response.data)
			);
		}
		dispatch(actions.resetBusyIndicator());
	};
};