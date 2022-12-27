import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Copyright from "./Copyright";
import NoRefLink from "./NoRefLink";
import * as constants from "../../utils/constants";
import getText from "../../messages";

export default function SignIn(props) {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password")
		});
	};
	let [type, setType] = React.useState(constants.SIGNIN);
	React.useEffect(() => {
		setType(props.type);
	}, [props.type]);
	if (type === constants.SIGNUP) {
		return (
			<>
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
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
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
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
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							{getText("signUp")}
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<NoRefLink
										variant="body2"
										text={"Already have an account? Sign in"}
										onClick={() => setType(constants.SIGNIN)}
								/>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
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
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							{getText("signIn")}
						</Typography>
						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
										text={getText("forgetPassword")}
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
