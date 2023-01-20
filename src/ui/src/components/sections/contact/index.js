import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Contact = () => {
	return (
		<>
			<Box
				sx={{
					marginLeft: "15%",
					marginRight: "15%",
					marginTop: "8%",
					marginBottom: "8%",
					alignContent: "center",
					justifyContent: "center",
					textAlign: "center",
				}}
			>
				<Box
					sx={{
						border: 5,
						height: 280
					}}
				>
					<Grid
						flexDirection="row"
						container
						sx={{
							padding: "10%",
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center"
						}}
					>
						<Grid item>
							<LinkedInIcon sx={{ transform: "scale(4)" }} />
						</Grid>
						<Grid item>
							<LinkedInIcon sx={{ transform: "scale(4)" }} />
						</Grid>
						<Grid item>
							<LinkedInIcon sx={{ transform: "scale(4)" }} />
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	);
};

export default Contact;
