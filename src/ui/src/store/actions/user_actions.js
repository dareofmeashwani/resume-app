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
			dispatch(actions.clearGlobalNotifications());
		} catch (error) {
			dispatch(
				actions.errorGlobal({
					...error.response.data
				})
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
				gender: values.gender,
				lastname: values.lastname,
				dob: new Date(values.birthday).toISOString(),
				mobile: values.mobile
			});
			dispatch(actions.authUser(user.data));
			dispatch(actions.clearGlobalNotifications());
		} catch (error) {
			dispatch(
				actions.errorGlobal({
					...error.response.data
				})
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
				actions.errorGlobal({
					...error.response.data
				})
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
				actions.errorGlobal({
					...error.response.data
				})
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
					actions.errorGlobal({
						...error.response.data
					})
				);
			}
		}
		dispatch(actions.resetBusyIndicator());
	};
};

export const changeEmail = (data) => {
	return async (dispatch) => {
		try {
			await axios.patch(`/api/users/update_email`, {
				email: data.email,
				newemail: data.newemail
			});

			dispatch(actions.changeUserEmail(data.newemail));
			dispatch(actions.successGlobal("Good job!!"));
		} catch (error) {
			dispatch(actions.errorGlobal(error.response.data.message));
		}
	};
};

/// updateUserProfile

export const updateUserProfile = (data) => {
	return async (dispatch, getState) => {
		try {
			const profile = await axios.patch(`/api/users/profile`, data);

			const userData = {
				...getState().users.data,
				...profile.data
			};
			dispatch(actions.updateUserProfile(userData));
			dispatch(actions.successGlobal("Profile updated"));
		} catch (error) {
			dispatch(actions.errorGlobal(error.response.data.message));
		}
	};
};

export const contactUs = (data) => {
	return async (dispatch) => {
		try {
			await axios.post(`/api/users/contact`, data);
			dispatch(actions.successGlobal("We will contact you back"));
		} catch (error) {
			dispatch(actions.errorGlobal(error.response.data.message));
		}
	};
};

export const accountVerify = (token) => {
	return async (dispatch, getState) => {
		try {
			const user = getState().users.auth;
			await axios.get(`/api/users/verify?validation=${token}`);

			if (user) {
				dispatch(actions.emailVerify());
			}
			dispatch(actions.successGlobal("Account verified !!"));
		} catch (error) {
			dispatch(actions.errorGlobal(error.response.data.message));
		}
	};
};
