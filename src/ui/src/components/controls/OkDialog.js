import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import getText from "../../messages";

export default function RowRadioButtonsGroup(props) {
	const msg = props.message || "";
	const closeHandler = props.closeHandler;
	return (
		<Dialog open={!!msg} onClose={closeHandler}>
			<DialogContent>
				<DialogContentText>{msg}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={closeHandler}>
					{getText("ok")}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
