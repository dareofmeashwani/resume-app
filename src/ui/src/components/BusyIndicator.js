import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

export default function BusyIndicator() {
	const [open, setOpen] = React.useState(false);

	const busyIndicator = useSelector((state) => {
		return state.busyIndicatorData.count;
	});
	React.useEffect(() => {
		if (busyIndicator === 0) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, [busyIndicator]);
	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000,}}
			open={open}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
