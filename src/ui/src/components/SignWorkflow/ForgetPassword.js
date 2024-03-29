import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Typography from "@mui/material/Typography";
import NoRefLink from "../controls/NoRefLink";
import * as constants from "../../utils/constants";
import getText from "../../messages";
import { errorHelper } from "../../utils";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function ForgetPassword(props) {
	const setType = props.setType;
	const handleReset = props.handleReset;
	const formik = useFormik({
		initialValues: { email: "" },
		validationSchema: Yup.object({
			email: Yup.string()
				.required(getText("inputEmailRequired"))
				.email(getText("invalidEmailInputWarning")),
		}),
		onSubmit: (values) => {
			handleReset(values);
		}
	});
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<QuestionMarkIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				{getText("forgetPassword")}
			</Typography>
			<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
				<TextField
					required
					margin="normal"
					fullWidth
					id="email"
					label={getText("emailAddress")}
					name="email"
					autoComplete="email"
					type="email"
					{...formik.getFieldProps("email")}
					{...errorHelper(formik, "email")}
				/>
				<Button type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }}>
					{getText("sendResetLink")}
				</Button>
				<Grid container>
					<Grid item>
						<NoRefLink
							sx={{ marginRight: "3rem" }}
							variant="body2"
							text={getText("haveAccountSignIn")}
							onClick={() => setType(constants.SIGNIN)}
						/>
					</Grid>
					<Grid item>
						<NoRefLink
							sx={{ marginLeft: "3rem" }}
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
