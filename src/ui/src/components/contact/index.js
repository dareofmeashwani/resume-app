import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@mui/material/TextField";
import getText from "../../messages";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../utils";
import { sendQuery,queryClear } from "../../store/actions/queryActions";
import OkDialog from "../controls/OkDialog";
import { useDispatch, useSelector } from "react-redux";
const Contact = () => {
	const dispatch = useDispatch();
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			mobile: "",
			subject: "",
			description: ""
		},
		validationSchema: Yup.object({
			name: Yup.string().required(getText("inputNameRequired")).max(200),
			email: Yup.string()
				.required(getText("inputEmailRequired"))
				.email(getText("invalidEmailInputWarning"))
				.max(256),
			mobile: Yup.string()
				.required(getText("inputMobileNumberRequired"))
				.matches(phoneRegExp, getText("inputInvalidMobileNumber"))
				.max(13),
			subject: Yup.string().required(getText("inputSubjectRequired")).max(200),
			description: Yup.string().max(500)
		}),
		onSubmit: (values) => {
			dispatch(sendQuery(values));
			formik.resetForm();
		}
	});
	let [message, setMessage] = React.useState("");
	const onCloseDialog = () => {
		setMessage("");
		dispatch(queryClear())
	};
	const queryData = useSelector((state) => {
		return state.queryData;
	});
	React.useEffect(() => {
		if (queryData && queryData.type === "success") {
			setMessage(getText("querySuccessMsg"));
		}
	}, [queryData]);
	return (
		<>
			<OkDialog closeHandler={onCloseDialog} message={message} />
			<Box
				sx={{
					marginLeft: "20%",
					marginRight: "20%",
					marginTop: "8%",
					marginBottom: "8%",
					alignContent: "center",
					justifyContent: "center",
					textAlign: "center"
				}}
			>
				<Box
					sx={{
						border: 4,
						height: 220
					}}
				>
					<Grid
						flexDirection="row"
						container
						height="100%"
						sx={{
							padding: "10%",
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center"
						}}
					>
						<Grid item>
							<Link
								href="https://www.linkedin.com/in/connect2ashwaniverma"
								target="_blank"
								sx={{
									backgroundColor: "transparent",
									color: "#ffffff"
								}}
							>
								<LinkedInIcon sx={{ transform: "scale(3)" }} />
							</Link>
						</Grid>
						<Grid item>
							<Link
								href="https://github.com/dareofmeashwani"
								target="_blank"
								sx={{
									backgroundColor: "transparent",
									color: "#ffffff"
								}}
							>
								<GitHubIcon sx={{ transform: "scale(3)" }} href="/" />
							</Link>
						</Grid>
						<Grid item>
							<Link
								href="mailto:connect2ashwaniverma@gmail.com"
								target="_blank"
								sx={{
									backgroundColor: "transparent",
									color: "#ffffff"
								}}
							>
								<EmailIcon sx={{ transform: "scale(3)" }} />
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Box
				sx={{
					marginLeft: "20%",
					marginRight: "20%",
					marginBottom: "5%"
				}}
			>
				<Typography variant="h6">{getText("writeToMe")}</Typography>
				<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								sx={{ width: "25rem" }}
								autoComplete="given-name"
								name="name"
								id="name"
								label={getText("name")}
								{...formik.getFieldProps("name")}
								{...errorHelper(formik, "name")}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								sx={{ width: "25rem" }}
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
								sx={{ width: "25rem" }}
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
								sx={{ width: "25rem" }}
								autoComplete="subject"
								name="subject"
								id="subject"
								label={getText("subject")}
								{...formik.getFieldProps("subject")}
								{...errorHelper(formik, "subject")}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography>{getText("details")}</Typography>
							<TextareaAutosize
								style={{
									width: "25rem",
									height: "10rem",
									backgroundColor: "inherit",
									color: "inherit"
								}}
								autoComplete="details"
								name="description"
								id="description"
								{...formik.getFieldProps("description")}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
								{getText("submit")}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	);
};

export default Contact;
