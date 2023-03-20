import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import getText from "../../messages";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../utils";

export default function ChangePassword(props) {
	const open = props.open;
	const closeHandler = props.closeHandler;
	const successHandler = props.successHandler;
	let [saveEnabled, setSaveEnabled] = React.useState(false);

	const password = Yup.string()
		.required(getText("inputPasswordRequired"))
		.min(8, getText("inputPasswordMinLenWarning"));
	const confirmPassword = Yup.string()
		.required(getText("inputPasswordRequired"))
		.min(8, getText("inputPasswordMinLenWarning"));

	const formik = useFormik({
		initialValues: {
			password: "",
			confirmPassword: ""
		},
		validate: async (values) => {
			const errors = {}
			try {
				await password.validate(values.password);
			} catch (err) {
				errors.password = err.message
			}
			try {
				await confirmPassword.validate(values.confirmPassword);
			} catch (err) {
				errors.confirmPassword = err.message
			}
			if (Object.keys(errors).length == 0 && values.confirmPassword != values.password) {
				errors.confirmPassword = getText("passwordNotMatching");
				errors.password = getText("passwordNotMatching")
			}
			setSaveEnabled(Object.keys(errors).length == 0);
			return errors;
		}
	});
	return (
		<Dialog open={open} onClose={closeHandler}>
			<DialogTitle>{getText("changePassword")}</DialogTitle>
			<DialogContent>
				<Box>
					<TextField
						autoFocus
						required
						sx={{ width: "20rem" }}
						name="firstname"
						id="firstname"
						margin="normal"
						type="password"
						label={getText("firstname")}
						autoComplete="new-password"
						{...formik.getFieldProps("password")}
						{...errorHelper(formik, "password")}
					/>
					<TextField
						required
						sx={{
							width: "20rem"
						}}
						name="confirmPassword"
						label={getText("confirmPassword")}
						type="password"
						id="confirmPassword"
						autoComplete="new-password"
						{...formik.getFieldProps("confirmPassword")}
						{...errorHelper(formik, "confirmPassword")}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeHandler} type="submit" color="success">{getText("cancel")}</Button>
				<Button type="submit" color="success" disabled={!saveEnabled} onClick={() => {
					successHandler(formik.values);
				}}>
					{getText("Save")}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
