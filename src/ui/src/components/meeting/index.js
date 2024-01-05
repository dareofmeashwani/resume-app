/* eslint-disable no-undef */
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import getText from "../../messages";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ItemsList from "./ItemsList";
import MainCard from "../controls/MainCard";
import { getMeetingList, clearMeetingsList } from "../../store/actions/meetingsActions";

const Meeting = (props) => {
  const dispatch = useDispatch();
  const [listType, setListType] = React.useState('upcoming');
  const user = useSelector((state) => {
    return state.userData.user;
  });
  let meetingsList = useSelector((state) => {
    return state.meetingsData.meetingsList;
  });
  React.useEffect(() => () => {
    dispatch(clearMeetingsList());
  }, [])
  React.useEffect(() => {
    if (!meetingsList && user) {
      let sort = "desc";
      let sortBy = "createdAt";
      if (listType === "upcoming") {
        sortBy = "start";
        sort = "asc";
      } else if (listType === "previous") {
        sortBy = "end";
        sort = "desc";
      }
      dispatch(getMeetingList(listType, sort, sortBy));
    }
  }, [user, meetingsList]);
  function isCalendlyEvent(e) {
    return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
  };
  window.addEventListener("message", function (e) {
    if (isCalendlyEvent(e)) {
      if (listType !== "previous") {
        if(e.data.event==="calendly.event_scheduled"){
          dispatch(clearMeetingsList());
        }
      }
    }
  });
  return (
    <Box sx={{
      marginLeft: "15%",
      marginRight: "15%",
      marginTop: "5%",
      marginBottom: "5%"
    }}>
      <Grid>
        {!user ? <Grid container
          alignItems='center'
          justify='center'
          style={{ minHeight: "50vh" }}>
          <Grid >
            <Typography>{getText("meetingNotLoggedInMsg")}</Typography>
            <Box sx={{
              display: "flex",
              alignContent: "center",
              textAlign: "center",
              alignSelf: "center"
            }}>
              <Button variant="contained" color="success" sx={{ mt: 3, mb: 2 }} onClick={() => Calendly.initPopupWidget({ url: "https://calendly.com/connect2ashwaniverma/30-minute-meeting" })}>
                {getText("createMeeting")}
              </Button>
            </Box>
          </Grid>
        </Grid> :
          <Grid >
            <MainCard title={getText("Meetings")} actions={
              <>
                  <Button color="success" variant={listType === "all" ? "contained" : "outlined"} onClick={() => {
                    if (listType !== "all") {
                      setListType("all");
                      dispatch(clearMeetingsList());
                    }
                  }}>{getText("all")}</Button>
                  <Button color="success" variant={listType === "upcoming" ? "contained" : "outlined"} onClick={() => {
                    if (listType !== "upcoming") {
                      setListType("upcoming");
                      dispatch(clearMeetingsList());
                    }
                  }}>{getText("upcoming")}</Button>
                  <Button color="success" variant={listType === "previous" ? "contained" : "outlined"} onClick={() => {
                    if (listType !== "previous") {
                      setListType("previous");
                      dispatch(clearMeetingsList());
                    }
                  }}>{getText("previous")}</Button>
                <IconButton aria-label="comment" onClick={() => {
                  Calendly.initPopupWidget({
                    url: "https://calendly.com/connect2ashwaniverma/30-minute-meeting", prefill: {
                      name: `${user.firstname} ${user.lastname}`,
                      email: user.email,
                      branding: false
                    }
                  })
                }} sx={{ marginLeft: ".5rem", marginRight: ".5rem" }}>
                  <AddIcon />
                </IconButton>
              </>
            }>
              {Array.isArray(meetingsList) && meetingsList.length ? <ItemsList items={meetingsList} /> :
                <Box>
                  <Typography margin={"1rem"} sx={{
                    alignSelf: "center", alignContent: "center",
                    textAlign: "center",
                  }}>{ listType === "upcoming"? getText("noUpcomingMeeting") :getText("noMeetingCreated")}</Typography>
                </Box>}
            </MainCard>
          </Grid>}
      </Grid>
    </Box>
  );
};

export default Meeting;
