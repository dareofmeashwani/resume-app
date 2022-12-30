import * as React from "react";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
export default function Confirmation(props) {
	const msg = props.message || "";
	return (
		<Box
			sx={{
				margin: "4rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<CheckCircleOutlineIcon />
			</Avatar>
			<Typography variant="body2" gutterBottom sx={{ marginTop: "3rem" }}>
				{msg}
			</Typography>
		</Box>
	);
}
