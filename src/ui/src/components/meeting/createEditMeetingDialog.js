import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import getText from "../../messages";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { textAlign } from "@mui/system";

export default function CreateEditMeetingDialog(props) {
	const open = props.open;
	const closeHandler = props.closeHandler;
	const successHandler = props.successHandler;
	let [duration, setDuration] = React.useState(15);
	return (
		<Dialog open={open} onClose={closeHandler}>
			<DialogTitle>{getText("scheduleMeeting")}</DialogTitle>
			<DialogContent>
				<Box>
					<TextField
						autoFocus
						margin="normal"
						id="title"
						label={getText("meetingTitle")}
						placeholder={getText("meetingTitle")}
						fullWidth
					/>
					<TextField
						id="description"
						height="8rem"
						label={getText("description")}
						placeholder={getText("meetingDescPlaceHolder")}
						rows={3}
						fullWidth
						multiline
					/>
					<Grid >
						<Grid item sx={{ marginTop: ".5rem", marginBottom: ".5rem", textAlign: "start" }} xs={6}>
							<FormControl sx={{ minWidth: "10rem", marginBottom: ".5rem" }}>
								<InputLabel id="demo-simple-select-autowidth-label">{getText("duration")}</InputLabel>
								<Select
									labelId="demo-simple-select-autowidth-label"
									id="demo-simple-select-autowidth"
									value={duration}
									onChange={(oEvent) => { setDuration(oEvent.target.value) }}
									label={getText("duration")}
								>
									<MenuItem value={15}>{getText("fifteenMinutes")}</MenuItem>
									<MenuItem value={30}>{getText("thirtyMinutes")}</MenuItem>
									<MenuItem value={40}>{getText("fortyMinutes")}</MenuItem>
								</Select>
							</FormControl>
							<InputLabel>{getText("selectDate")}</InputLabel>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar sx={{ color: "inherit", backgroundColor: "inherit", margin: "0", padding: "0" }} minDate={dayjs()}
									showDaysOutsideCurrentMonth={true} displayWeekNumber={false}
									maxDate={dayjs(Date.now() + 365 * 24 * 60 * 60 * 1000)}
									shouldDisableDate={(date) => date.$d.getDay()===0 || date.$d.getDay()===7? true: false } />
							</LocalizationProvider>
						</Grid>
						<Grid item xs={6}>
						<InputLabel >{getText("availableSlots")}</InputLabel>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeHandler}>{getText("cancel")}</Button>
				<Button onClick={closeHandler}>{getText("create")}</Button>
			</DialogActions>
		</Dialog>
	);
}
