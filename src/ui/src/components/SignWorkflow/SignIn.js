import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import NoRefLink from "../controls/NoRefLink";
import * as constants from "../../utils/constants";
import getText from "../../messages";
import { errorHelper } from "../../utils";

export default function SignIn(props) {
	const setType = props.setType;
	const handleSignIn = props.handleSignIn;
	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: Yup.object({
			email: Yup.string()
				.required(getText("inputEmailRequired"))
				.email(getText("invalidEmailInputWarning")),
			password: Yup.string()
				.required(getText("inputPasswordRequired"))
				.min(8, getText("inputPasswordMinLenWarning"))
		}),
		onSubmit: (values) => {
			handleSignIn(values);
		}
	});
	return (
		<Box
			sx={{
				margin: "4rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOpenIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				{getText("signIn")}
			</Typography>
			<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					fullWidth
					id="email"
					label={getText("emailAddress")}
					name="email"
					autoComplete="email"
					type="email"
					autoFocus
					{...formik.getFieldProps("email")}
					{...errorHelper(formik, "email")}
				/>
				<TextField
					margin="normal"
					fullWidth
					name="password"
					label={getText("password")}
					type="password"
					id="password"
					autoComplete="current-password"
					{...formik.getFieldProps("password")}
					{...errorHelper(formik, "password")}
				/>
				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					{getText("signIn")}
				</Button>
				<Grid container>
					<Grid item xs>
						<NoRefLink
							variant="body2"
							text={getText("forgetYourPassword")}
							onClick={() => setType(constants.FORGET_PASSWORD)}
						/>
					</Grid>
					<Grid item>
						<NoRefLink
							variant="body2"
							text={getText("dontHaveAccount")}
							onClick={() => setType(constants.SIGNUP)}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
