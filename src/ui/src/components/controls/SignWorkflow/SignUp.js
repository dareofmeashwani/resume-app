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
export default function SignUp(props) {
	const setType = props.setType;
	const handleSignUp = props.handleSignUp;
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
			<Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
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
