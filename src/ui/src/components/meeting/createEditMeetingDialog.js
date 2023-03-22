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
import momentTz from "moment-timezone";
import moment from "moment";
import * as Yup from "yup";
import { USER } from "../../utils/constants";
import { getDomainName, formatAMPM } from "../../utils";

export default function CreateEditMeetingDialog(props) {
	const dispatch = useDispatch();
	const open = props.open;
	const initial = props.initial;
	const closeHandler = props.closeHandler;
	const successHandler = props.successHandler;
	const initialDate = initial ? dayjs(initial.start) > dayjs() ? dayjs(initial.start) : dayjs() : dayjs();
	let [title, setTitle] = React.useState(initial && initial.title || "");
	let [email, setEmail] = React.useState("");
	let [emailIteraction, setEmailIteraction] = React.useState("");
	let [emailError, setEmailError] = React.useState("");
	let [description, setDescription] = React.useState(initial && initial.description || "");
	let [members, setMembers] = React.useState(initial && initial.members.join(",") || "");
	let [memberError, setMemberError] = React.useState("");
	let [timeZone, setTimeZone] = React.useState(momentTz.tz.guess());
	let [duration, setDuration] = React.useState(initial ? Math.floor((new Date(initial.end) - new Date(initial.start)) / 60000) : 15);
	let [selectedDate, setSelectedDate] = React.useState(initialDate);
	let [slots, setSlots] = React.useState([]);
	let [selectedSlot, setSelectedSlot] = React.useState();
	let [createEnabled, setCreateEnabled] = React.useState(false);
	let meetingsStatusList = useSelector((state) => {
		return state.meetingsData.meetingsStatusList;
	});
	const user = useSelector((state) => {
		return state.userData.user;
	});
	React.useEffect(() => {
		dispatch(getMeetingStatus(selectedDate.$d.toISOString()));
	}, [selectedDate]);

	React.useEffect(() => {
		setCreateEnabled(!!selectedSlot && !memberError && (user ? true : !emailError && !!email));
	}, [memberError, selectedSlot, emailError]);

	React.useEffect(() => {
		let memberError = "";
		const membersArray = members.trim().split(/[;, ]/).filter(email => !!email);
		const emailSchema = Yup.string().email();
		if (!membersArray.reduce((prev, current) => {
			return prev && emailSchema.isValidSync(current);
		}, true)) {
			memberError = getText("invalidMembersInput")
		}
		setMemberError(memberError);
	}, [members]);

	React.useEffect(() => {
		let emailError = "";
		const emailSchema = Yup.string().email();
		if (emailIteraction == 0) {
			setEmailIteraction(emailIteraction + 1);
			return;
		}
		if (!user) {
			emailError = !email ? getText("inputEmailRequired") : !emailSchema.isValidSync(email) ? getText("invalidEmailInputWarning") : "";
		}
		setEmailError(emailError);
	}, [email]);

	function computeSlots() {
		if (meetingsStatusList && Array.isArray(meetingsStatusList)) {
			const busySlots = meetingsStatusList.map((status) => {
				return { start: moment(status.start), end: moment(status.end) };
			});
			const useSelectedDate = new moment(selectedDate.$d);
			const currentDate = new moment();
			const start = moment.tz(`${useSelectedDate.year()}-${useSelectedDate.month() + 1}-${useSelectedDate.date()} ${USER.START}:00`, USER.TIMEZONE);
			const end = moment.tz(`${useSelectedDate.year()}-${useSelectedDate.month() + 1}-${useSelectedDate.date()} ${USER.END}:00`, USER.TIMEZONE);
			let possibleSlots = [];
			let pointer = start.clone();
			let slotEnd = moment.tz(pointer.valueOf() + duration * 60 * 1000, USER.TIMEZONE);

			while (pointer < end && slotEnd <= end) {
				if (pointer > currentDate) {
					possibleSlots.push({
						start: pointer,
						end: slotEnd
					});
				}
				pointer = slotEnd;
				slotEnd = moment.tz(pointer.valueOf() + duration * 60 * 1000, USER.TIMEZONE);
			}
			possibleSlots = possibleSlots.filter((slot) => {
				return !busySlots.reduce((prev, current) => prev
					|| (slot.start >= current.start && slot.end <= current.end)
					|| (slot.start < current.start && slot.end > current.start)
					|| (slot.start < current.end && slot.end > current.end)
					, false);
			}).map((slot) => {
				return {
					...slot,
					text: `${formatAMPM(slot.start.clone().tz(timeZone))} - ${formatAMPM(slot.end.clone().tz(timeZone))}`
				}
			});
			if (initial
				&& selectedDate.$d.toDateString() === (new Date(initial.start)).toDateString()
				&& Math.floor((new Date(initial.end) - new Date(initial.start)) / 60000) === Number(duration)) {
				const initialStart = moment.tz(initial.start, USER.TIMEZONE);
				const initialEnd = moment.tz(initial.end, USER.TIMEZONE);
				const initialSlot = {
					start: initialStart,
					end: initialEnd,
					text: `${formatAMPM(initialStart.clone().tz(timeZone))} - ${formatAMPM(initialEnd.clone().tz(timeZone))}`
				};
				let index = 0;
				while (possibleSlots.length && possibleSlots[index].start < initialSlot.start) {
					index++;
				}
				possibleSlots.splice(index, 0, initialSlot);
				setSlots(possibleSlots);
				setSelectedSlot(possibleSlots[index].text);
			} else if (possibleSlots.length) {
				setSlots(possibleSlots);
				setSelectedSlot(possibleSlots[0].text);
			}
			if (!possibleSlots.length) {
				setSelectedDate(dayjs(selectedDate.add(1, "day")));
			}
		}
	}
	React.useEffect(computeSlots, [meetingsStatusList, duration, timeZone]);

	const onMeetingCreate = () => {
		const selectedSlotObject = slots.find(slot => slot.text === selectedSlot);
		const payload = {
			title: title || `${getText("meetingWith")} ${getDomainName()}`,
			description,
			members: members.trim().split(/[;, ]/).filter(email => !!email),
			start: selectedSlotObject.start.toISOString(),
			end: selectedSlotObject.end.toISOString(),
		}
		if (!user) {
			payload.email = email;
		}
		successHandler && successHandler(payload);
	};
	return (
		<Dialog open={open} onClose={closeHandler} width="auto">
			<DialogTitle>{getText("scheduleMeeting")}</DialogTitle>
			<DialogContent>
				<Box>
					<TextField
						autoFocus
						id="title"
						sx={{ marginTop: ".25rem", marginBottom: ".25rem" }}
						value={title}
						label={getText("meetingTitle")}
						placeholder={getText("meetingTitle")}
						onChange={(oEvent) => { setTitle(oEvent.target.value) }}
						fullWidth
					/>
					{!user && <TextField
						sx={{ marginTop: ".5rem", marginBottom: ".25rem" }}
						id="email"
						value={email}
						label={getText("email")}
						placeholder={getText("emailMeetingPlaceHolder")}
						onChange={(oEvent) => setEmail(oEvent.target.value)}
						error={!!emailError}
						helperText={emailError}
						required
						fullWidth
					/>}
					<TextField
						id="description"
						sx={{ marginTop: ".25rem", marginBottom: ".25rem" }}
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
						sx={{ marginTop: ".25rem", marginBottom: ".25rem" }}
						value={members}
						label={getText("additionalParticipants")}
						placeholder={getText("additionalParticipantsPlaceHolder")}
						onChange={(oEvent) => setMembers(oEvent.target.value)}
						rows={1}
						error={!!memberError}
						helperText={memberError}
						fullWidth
						multiline
					/>
					<Grid >
						<Grid item sx={{
							marginTop: ".5rem"
						}} xs={6}>
							<InputLabel>{getText("selectDate")}</InputLabel>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar sx={{ color: "inherit", backgroundColor: "inherit", margin: "0", padding: "0" }} minDate={dayjs()}
									showDaysOutsideCurrentMonth={true} displayWeekNumber={false}
									maxDate={dayjs(Date.now() + 365 * 24 * 60 * 60 * 1000)}
									shouldDisableDate={(date) => date.$d.getDay() === 0 || date.$d.getDay() === 7 ? true : false}
									value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
							</LocalizationProvider>
							<Grid sx={{
								justifyContent: "space-evenly",
								alignContent: "flex-start"
							}}>
								<FormControl sx={{ width: "12rem", marginBottom: ".5rem", marginRight: "2rem" }}>
									<InputLabel variant="standard" htmlFor="uncontrolled-native">
										{getText("timezone")}
									</InputLabel>
									<NativeSelect
										value={timeZone}
										onChange={(oEvent) => setTimeZone(oEvent.target.value)}
									>
										{momentTz.tz.names().sort().map((tz, index) => {
											return <option key={index} value={tz}>{tz}</option>
										})}
									</NativeSelect>
								</FormControl>
								<FormControl sx={{ width: "12rem", marginBottom: ".5rem", marginRight: "2rem" }}>
									<InputLabel variant="standard" htmlFor="uncontrolled-native">
										{getText("duration")}
									</InputLabel>
									<NativeSelect
										value={duration}
										onChange={(oEvent) => setDuration(oEvent.target.value)}
									>
										<option value={15}>{getText("fifteenMinutes")}</option>
										<option value={30}>{getText("thirtyMinutes")}</option>
										<option value={40}>{getText("fortyMinutes")}</option>
									</NativeSelect>
								</FormControl>
								<FormControl sx={{ width: "12rem", marginBottom: ".5rem" }}>
									<InputLabel variant="standard" htmlFor="uncontrolled-native">
										{getText("availableSlots")}
									</InputLabel>
									<NativeSelect defaultValue={selectedSlot} value={selectedSlot} onChange={(oEvent) => setSelectedSlot(oEvent.target.value)}>
										{slots ? slots.map((slot, index) => {
											return <option key={index} value={slot.text}>{slot.text}</option>
										}) : null}
									</NativeSelect>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeHandler} color="success" >{getText("cancel")} </Button>
				<Button onClick={onMeetingCreate} disabled={!createEnabled} color="success" >
					{getText(initial ? "edit" : "create")}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
