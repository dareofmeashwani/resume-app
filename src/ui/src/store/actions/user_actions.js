import * as users from "./index";
import axios from "axios";
import { removeCookieToken, getCookieToken } from "../../utils/cookie";
import { HTTP_STATUS } from "../../utils/constants";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const signInUser = (values) => {
	return async (dispatch) => {
		try {
			const user = await axios.post(`/api/v1/user/login`, {
				email: values.email,
				password: values.password
			});
			dispatch(users.authUser(user.data));
			dispatch(users.clearGlobalNotifications());
		} catch (error) {
			dispatch(
				users.errorGlobal({
					...error.response.data
				})
			);
		}
	};
};

export const signUpUser = (values) => {
	return async (dispatch) => {
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
			dispatch(users.authUser(user.data));
			dispatch(users.clearGlobalNotifications());
		} catch (error) {
			dispatch(
				users.errorGlobal({
					...error.response.data
				})
			);
		}
	};
};

export const forgetUserPassword = (values) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`/api/v1/user/forgetPassword`, {
				email: values.email
			});
			dispatch(users.forgetPassword(response.data));
		} catch (error) {
			dispatch(
				users.errorGlobal({
					...error.response.data
				})
			);
		}
	};
};

export const signOut = () => {
	return async (dispatch) => {
		try {
			await axios.post(`/api/v1/user/logout`);
			dispatch(users.signOut(null));
			removeCookieToken();
		} catch (error) {
			dispatch(
				users.errorGlobal({
					...error.response.data
				})
			);
		}
	};
};

export const isAuthUser = () => {
	return async (dispatch) => {
		try {
			if (!getCookieToken()) {
				return;
			}
			const response = await axios.get(`/api/v1/user/isAuth`);
			dispatch(users.authUser(response.data));
		} catch (error) {
			if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
				dispatch(users.signOut());
				removeCookieToken();
			} else {
				dispatch(
					users.errorGlobal({
						...error.response.data
					})
				);
			}
		}
	};
};

export const changeEmail = (data) => {
	return async (dispatch) => {
		try {
			await axios.patch(`/api/users/update_email`, {
				email: data.email,
				newemail: data.newemail
			});

			dispatch(users.changeUserEmail(data.newemail));
			dispatch(users.successGlobal("Good job!!"));
		} catch (error) {
			dispatch(users.errorGlobal(error.response.data.message));
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
			dispatch(users.updateUserProfile(userData));
			dispatch(users.successGlobal("Profile updated"));
		} catch (error) {
			dispatch(users.errorGlobal(error.response.data.message));
		}
	};
};

export const contactUs = (data) => {
	return async (dispatch) => {
		try {
			await axios.post(`/api/users/contact`, data);
			dispatch(users.successGlobal("We will contact you back"));
		} catch (error) {
			dispatch(users.errorGlobal(error.response.data.message));
		}
	};
};

export const accountVerify = (token) => {
	return async (dispatch, getState) => {
		try {
			const user = getState().users.auth;
			await axios.get(`/api/users/verify?validation=${token}`);

			if (user) {
				dispatch(users.emailVerify());
			}
			dispatch(users.successGlobal("Account verified !!"));
		} catch (error) {
			dispatch(users.errorGlobal(error.response.data.message));
		}
	};
};
