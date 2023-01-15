import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import NoRefLink from "../NoRefLink";
import * as constants from "../../../utils/constants";
import getText from "../../../messages";
import GenderRadio from "../GenderRadio";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../../utils";
export default function SignUp(props) {
	const setType = props.setType;
	const handleSignUp = props.handleSignUp;
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			mobile: "",
			firstname: "",
			birthday: "",
			lastname: "",
			gender: "female"
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.required(getText("inputEmailRequired"))
				.email(getText("invalidEmailInputWarning")),
			password: Yup.string()
				.required(getText("inputPasswordRequired"))
				.min(8, getText("inputPasswordMinLenWarning")),
			mobile: Yup.string()
				.required(getText("inputMobileNumberRequired"))
				.matches(phoneRegExp, getText("inputInvalidMobileNumber")),
			firstname: Yup.string().required(getText("inputFirstNameRequired")),
			birthday: Yup.string().required(getText("inputBirthdayRequired"))
		}),
		onSubmit: (values) => {
			handleSignUp(values);
		}
	});
	return (
		<Box
			sx={{
				marginTop: "4rem",
				marginLeft: "4rem",
				marginRight: "4rem",
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
			<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
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
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							id="lastname"
							label={getText("lastname")}
							name="lastname"
							autoComplete="family-name"
							{...formik.getFieldProps("lastname")}
							{...errorHelper(formik, "lastname")}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="email"
							type="email"
							label={getText("emailAddress")}
							name="email"
							autoComplete="email"
							{...formik.getFieldProps("email")}
							{...errorHelper(formik, "email")}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="mobile"
							type="tel"
							label={getText("mobile")}
							name="mobile"
							autoComplete="mobile"
							{...formik.getFieldProps("mobile")}
							{...errorHelper(formik, "mobile")}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name="password"
							label={getText("password")}
							type="password"
							id="password"
							autoComplete="new-password"
							{...formik.getFieldProps("password")}
							{...errorHelper(formik, "password")}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="birthday"
							label={getText("birthday")}
							type="date"
							InputLabelProps={{
								shrink: true
							}}
							{...formik.getFieldProps("birthday")}
							{...errorHelper(formik, "birthday")}
						/>
					</Grid>
					<Grid item xs={12}>
						<GenderRadio
							required
							fullWidth
							id="gender"
							name="gender"
							autoComplete="gender"
							{...formik.getFieldProps("gender")}
							{...errorHelper(formik, "gender")}
						/>
					</Grid>
				</Grid>
				<Grid container justifyContent="space-between" sx={{ mt: 3, mb: 2 }}>
					<Button type="submit" variant="contained">
						{getText("signUp")}
					</Button>
					<Grid item>
						<NoRefLink
							variant="body2"
							text={getText("haveAccountSignIn")}
							onClick={() => setType(constants.SIGNIN)}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
