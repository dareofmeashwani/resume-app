import * as React from "react";
import Box from "@mui/material/Box";
import Copyright from "../Copyright";
import * as constants from "../../../utils/constants";
import Confirmation from "../Confirmation";
import ForgetPassword from "./ForgetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function SignWorkflow(props) {
	const handleReset = function (event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password")
		});
	};
	const handleSignIn = function (event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password")
		});
	};
	const handleSignUp = function (event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password")
		});
	};
	let [type, setType] = React.useState(constants.SIGNIN);
	let [message, setMessage] = React.useState("");
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
