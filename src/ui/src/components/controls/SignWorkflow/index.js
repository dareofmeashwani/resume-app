import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Copyright from "../Copyright";
import NoRefLink from "../NoRefLink";
import * as constants from "../../../utils/constants";
import getText from "../../../messages";
import GenderRadio from "../GenderRadio";
import Confirmation from "../Confirmation";
import ForgetPassword from "./ForgetPassword";

export default function SignIn(props) {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password")
		});
	};
    const handleReset = function(event){
        event.preventDefault();
        setType(constants.CONFIRMATION);
		setMessage("hello o");
    }
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
				<Box sx={{ margin: "4rem" }}>
					<ForgetPassword setType={setType} handleReset={handleReset} />
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Box>
			</>
		);
	}
	if (type === constants.SIGNUP) {
		return (
			<>
				<Box
					sx={{
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
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									type="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="mobile"
									type="tel"
									label="Mobile"
									name="mobile"
									autoComplete="mobile"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="date"
									label="Birthday"
									type="date"
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<GenderRadio
									required
									fullWidth
									id="gender"
									name="gender"
									autoComplete="gender"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
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
				<Copyright sx={{ mt: 0 }} />
			</>
		);
	}
	if (type === constants.SIGNIN) {
		return (
			<>
				<Box sx={{ margin: "4rem" }}>
					<Box
						sx={{
							marginTop: 8,
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
						<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label={getText("emailAddress")}
								name="email"
								autoComplete="email"
								type="email"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label={getText("password")}
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
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
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Box>
			</>
		);
	} else {
		return null;
	}
}
