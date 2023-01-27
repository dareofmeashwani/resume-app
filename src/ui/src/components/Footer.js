import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
const Footer = (props) => {
	return (
		<Paper
			sx={{
				marginTop: "calc(10% + 60px)",
				width: "100%",
				position: "fixed",
				bottom: 0,
			}}
			component="footer"
			square
			variant="outlined"
		>
			<Container maxWidth="lg">
				<Box align="center">
					<Typography variant="caption" color="inherit">
						Made using ReactJs, Material UI, ExpressJs & MongoDB. Hosted on Render,
						and open-sourced on GitHub
					</Typography>
				</Box>
				<Box align="center">
					<Typography variant="caption" color="inherit" padding={".5rem"}>
						{`© ${new Date().getFullYear()} Ashwani Kumar Verma`}
					</Typography>
				</Box>
			</Container>
		</Paper>
	);
};

export default Footer;
