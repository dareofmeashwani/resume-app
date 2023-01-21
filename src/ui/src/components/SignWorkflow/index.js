import * as React from "react";
import Box from "@mui/material/Box";
import Copyright from "../Copyright";
import * as constants from "../../../utils/constants";
import Confirmation from "../Confirmation";
import ForgetPassword from "./ForgetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { useDispatch, useSelector } from "react-redux";
import {
	signInUser,
	signUpUser,
	forgetUserPassword
} from "../../../store/actions/user_actions";

export default function SignWorkflow(props) {
	let [type, setType] = React.useState(constants.SIGNIN);
	let [message, setMessage] = React.useState("");
	const dispatch = useDispatch();
	const handleReset = function (event) {
		dispatch(forgetUserPassword(event));
	};
	const handleSignIn = function (event) {
		dispatch(signInUser(event));
	};
	const handleSignUp = function (event) {
		dispatch(signUpUser(event));
	};
	const forgetPasswordMessage = useSelector((state) => {
		return state.userData.forgetPasswordMessage;
	});
	React.useEffect(() => {
		if (forgetPasswordMessage) {
			setMessage(forgetPasswordMessage.message);
			setType(constants.CONFIRMATION);
		}
	}, [forgetPasswordMessage]);
	React.useEffect(() => {
		setType(props.type);
	}, [props.type]);
	if (type === constants.CONFIRMATION) {
		return (
			<>
				<Confirmation message={message} />
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</>
		);
	}
	if (type === constants.FORGET_PASSWORD) {
		return (
			<>
				<ForgetPassword setType={setType} handleReset={handleReset} />
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</>
		);
	}
	if (type === constants.SIGNUP) {
		return (
			<>
				<SignUp setType={setType} handleSignUp={handleSignUp} />
				<Copyright sx={{ mt: 0 }} />
			</>
		);
	}
	if (type === constants.SIGNIN) {
		return (
			<>
				<Box sx={{ margin: "4rem" }}>
					<SignIn setType={setType} handleSignIn={handleSignIn} />
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Box>
			</>
		);
	} else {
		return null;
	}
}
