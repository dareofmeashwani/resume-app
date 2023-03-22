import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import getText from "../../messages";
import EventBus from "../controls/EventBus";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ItemsList from "./ItemsList";
import MainCard from "../controls/MainCard";
import { getMeetingList, createMeeting, clearMeetingsList } from "../../store/actions/meetingsActions";
import CreateEditMeetingDialog from './createEditMeetingDialog';

const Meeting = (props) => {
  const dispatch = useDispatch();
  const [dialogState, setDialogState] = React.useState(false);
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
      dispatch(getMeetingList(listType,sort,sortBy));
    }
  }, [user, meetingsList]);

  const dialogCloseHandler = () => {
    setDialogState(false);
  }
  const onDialogSuccess = async (values) => {
    await dispatch(createMeeting(values));
    dialogCloseHandler();
  }

  return (
    <>
      {dialogState && <CreateEditMeetingDialog open={dialogState} closeHandler={dialogCloseHandler} successHandler={onDialogSuccess} />}
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
                <Button variant="contained" color="success" sx={{ mt: 3, mb: 2 }} onClick={() => setDialogState(true)}>
                  {getText("createMeeting")}
                </Button>
              </Box>
            </Grid>
          </Grid> :
            <Grid >
              <MainCard title={getText("Meetings")} actions={
                <>
                  <ButtonGroup>
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
                  </ButtonGroup>
                  <IconButton aria-label="comment" onClick={() => setDialogState(true)} sx={{ marginLeft: ".5rem", marginRight: ".5rem" }}>
                    <AddIcon />
                  </IconButton>
                </>
              }>
                {Array.isArray(meetingsList) && meetingsList.length ? <ItemsList items={meetingsList} /> :
                  <Box>
                    <Typography margin={"1rem"} sx={{
                      alignSelf: "center", alignContent: "center",
                      textAlign: "center",
                    }}>{getText("noMeetingCreated")}</Typography>
                  </Box>}
              </MainCard>
            </Grid>}
        </Grid>
      </Box>
    </>
  );
};

export default Meeting;
