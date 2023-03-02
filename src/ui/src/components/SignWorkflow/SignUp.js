import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import NoRefLink from "../controls/NoRefLink";
import * as constants from "../../utils/constants";
import getText from "../../messages";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../utils";
export default function SignUp(props) {
	const setType = props.setType;
	const handleSignUp = props.handleSignUp;
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			firstname: "",
			lastname: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.required(getText("inputEmailRequired"))
				.email(getText("invalidEmailInputWarning")),
			password: Yup.string()
				.required(getText("inputPasswordRequired"))
				.min(8, getText("inputPasswordMinLenWarning")),
			firstname: Yup.string().required(getText("inputFirstNameRequired")),
		}),
		onSubmit: (values) => {
			handleSignUp(values);
		}
	});
	return (
		<Box
			sx={{
				margin: "5rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<AppRegistrationIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				{getText("signUp")}
			</Typography>
			<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					autoFocus
					required
					fullWidth
					autoComplete="given-name"
					name="firstname"
					id="firstname"
					label={getText("firstname")}
					{...formik.getFieldProps("firstname")}
					{...errorHelper(formik, "firstname")}
				/>
				<TextField
					fullWidth
					margin="normal"
					id="lastname"
					label={getText("lastname")}
					name="lastname"
					autoComplete="family-name"
					{...formik.getFieldProps("lastname")}
					{...errorHelper(formik, "lastname")}
				/>
				<TextField
					required
					fullWidth
					margin="normal"
					id="email"
					type="email"
					label={getText("emailAddress")}
					name="email"
					autoComplete="email"
					{...formik.getFieldProps("email")}
					{...errorHelper(formik, "email")}
				/>
				<TextField
					required
					fullWidth
					margin="normal"
					name="password"
					label={getText("password")}
					type="password"
					id="password"
					autoComplete="new-password"
					{...formik.getFieldProps("password")}
					{...errorHelper(formik, "password")}
				/>
				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					{getText("signUp")}
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
							text={getText("haveAccountSignIn")}
							onClick={() => setType(constants.SIGNIN)}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box >
	);
}
