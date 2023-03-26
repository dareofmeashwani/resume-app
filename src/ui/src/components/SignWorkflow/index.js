import * as React from "react";
import Box from "@mui/material/Box";
import Copyright from "../controls/Copyright";
import * as constants from "../../utils/constants";
import Confirmation from "../controls/Confirmation";
import ForgetPassword from "./ForgetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { useDispatch, useSelector } from "react-redux";
import {
	signInUser,
	signUpUser,
	forgetUserPassword
} from "../../store/actions/userActions";

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
	return (<>
		<Box marginLeft={"20%"} marginRight={"20%"} marginTop={"5rem"}>
			{type === constants.CONFIRMATION ?
				<Confirmation message={message} /> : type === constants.FORGET_PASSWORD ?
					<ForgetPassword setType={setType} handleReset={handleReset} />
					: type === constants.SIGNUP ?
						<SignUp setType={setType} handleSignUp={handleSignUp} /> : type === constants.SIGNIN ?
							<SignIn setType={setType} handleSignIn={handleSignIn} /> : null}
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Box>
	</>
	);
}
