import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import NativeSelect from '@mui/material/NativeSelect';
import getText from "../../messages";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid } from "@mui/material";
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { getMeetingStatus } from "../../store/actions/meetingsActions";

export default function CreateEditMeetingDialog(props) {
	const dispatch = useDispatch();
	const open = props.open;
	const closeHandler = props.closeHandler;
	const successHandler = props.successHandler;
	let [title, setTitle] = React.useState("");
	let [description, setDescription] = React.useState("");
	let [members, setMembers] = React.useState([]);
	let [duration, setDuration] = React.useState(15);
	let [selectedDate, setSelectedDate] = React.useState(dayjs())
	let [slots, setSlots] = React.useState([]);
	let meetingsStatusList = useSelector((state) => {
		return state.meetingsData.meetingsStatusList;
	});
	React.useEffect(() => {
		dispatch(getMeetingStatus(selectedDate.$d.toISOString()));
	}, [selectedDate]);
	if (meetingsStatusList && Array.isArray(meetingsStatusList.docs)) {
		const busySlots = meetingsStatusList.docs;
	}
	const onSlotChange = (oEvent) => { setDuration(oEvent.target.value) }
	const onMemberChange = (oEvent) => { setMembers(oEvent.target.value) };
	const onMeetingCreate = () => {
		const payload = {
			title,
			description,

		}
		successHandler && successHandler(payload);
	};
	return (
		<Dialog open={open} onClose={closeHandler}>
			<DialogTitle>{getText("scheduleMeeting")}</DialogTitle>
			<DialogContent>
				<Box>
					<TextField
						autoFocus
						id="title"
						value={title}
						label={getText("meetingTitle")}
						placeholder={getText("meetingTitle")}
						onChange={(oEvent) => { setTitle(oEvent.target.value) }}
						fullWidth
					/>
					<TextField
						id="description"
						margin="normal"
						height="8rem"
						value={description}
						label={getText("description")}
						placeholder={getText("meetingDescPlaceHolder")}
						onChange={(oEvent) => { setDescription(oEvent.target.value) }}
						rows={2}
						fullWidth
						multiline
					/>
					<TextField
						id="members"
						height="8rem"
						value={members}
						label={getText("additionalParticipants")}
						placeholder={getText("additionalParticipantsPlaceHolder")}
						onChange={onMemberChange}
						rows={2}
						fullWidth
						multiline
					/>
					<Grid >
						<Grid item sx={{ marginTop: ".5rem", marginBottom: ".5rem", textAlign: "start" }} xs={6}>
							<InputLabel>{getText("selectDate")}</InputLabel>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar sx={{ color: "inherit", backgroundColor: "inherit", margin: "0", padding: "0" }} minDate={dayjs()}
									showDaysOutsideCurrentMonth={true} displayWeekNumber={false}
									maxDate={dayjs(Date.now() + 365 * 24 * 60 * 60 * 1000)}
									shouldDisableDate={(date) => date.$d.getDay() === 0 || date.$d.getDay() === 7 ? true : false}
									defaultValue={selectedDate} value={selectedDate} onChange={(newValue) => {
										setSelectedDate(newValue);
									}} />
							</LocalizationProvider>
							<FormControl sx={{ minWidth: "12rem", marginBottom: ".5rem", marginRight: "2rem" }}>
									<InputLabel variant="standard" htmlFor="uncontrolled-native">
										{getText("timezone")}
									</InputLabel>
									<NativeSelect
										defaultValue={duration}
										onChange={(oEvent) => { setDuration(oEvent.target.value) }}
									>
										<option value={15}>{getText("fifteenMinutes")}</option>
										<option value={30}>{getText("thirtyMinutes")}</option>
										<option value={40}>{getText("fortyMinutes")}</option>
									</NativeSelect>
								</FormControl>
							<Grid sx={{
								justifyContent: "space-evenly",
								alignContent: "flex-start"
							}}>
								<FormControl sx={{ minWidth: "12rem", marginBottom: ".5rem", marginRight: "2rem" }}>
									<InputLabel variant="standard" htmlFor="uncontrolled-native">
										{getText("duration")}
									</InputLabel>
									<NativeSelect
										defaultValue={duration}
										onChange={(oEvent) => { setDuration(oEvent.target.value) }}
									>
										<option value={15}>{getText("fifteenMinutes")}</option>
										<option value={30}>{getText("thirtyMinutes")}</option>
										<option value={40}>{getText("fortyMinutes")}</option>
									</NativeSelect>
								</FormControl>
								<FormControl sx={{ minWidth: "12rem", marginBottom: ".5rem" }}>
									<InputLabel variant="standard" htmlFor="uncontrolled-native">
										{getText("availableSlots")}
									</InputLabel>
									<NativeSelect onChange={onSlotChange}>
										{slots ? slots.map((slot) => <option value={slot}>{slot}</option>) : null}
									</NativeSelect>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeHandler}>{getText("cancel")}</Button>
				<Button onClick={onMeetingCreate}>{getText("create")}</Button>
			</DialogActions>
		</Dialog>
	);
}
