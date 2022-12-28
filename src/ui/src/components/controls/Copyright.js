import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { getDomainName } from "../../utils";
export default function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" href="/">
				{getDomainName()}
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
