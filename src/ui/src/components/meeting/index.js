import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import getText from "../../messages";
import EventBus from "../controls/EventBus";
const Meeting = (props) => {
  const user = useSelector((state) => {
    return state.userData.user;
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
              <Button variant="contained" color="success" sx={{ mt: 3, mb: 2 }} onClick={() => EventBus.emit("launchSignIn")}>
                {getText("signIn")}
              </Button>
              <Typography margin={"1rem"} sx={{alignSelf: "center"}}>{getText("or")}</Typography>
              <Button variant="contained" color="success" sx={{ mt: 3, mb: 2 }} onClick={() => EventBus.emit("launchSignUp")}>
                {getText("signUp")}
              </Button>
            </Box>
          </Grid>
        </Grid> :
          <Box>Coming Soon</Box>}
      </Grid>
    </Box>
  );
};

export default Meeting;
