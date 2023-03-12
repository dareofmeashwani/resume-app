import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import getText from "../../messages";

export default function CreateEditMeetingDialog(props) {
  const open = props.open;
  const closeHandler = props.closeHandler;
  const successHandler=  props.successHandler;
	return (
		<Dialog open={open} onClose={closeHandler}>
			<DialogContent>
				<DialogContentText>{"Edit/Create Metting Coming soon"}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={closeHandler}>
					{getText("ok")}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
