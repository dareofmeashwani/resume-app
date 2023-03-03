import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQueryVariable } from "../utils";
import { verifyEmailVerification } from "../store/actions/userActions";
import getText from "../messages";
import EventBus from "./controls/EventBus";
const EmailVerification = (props) => {
  const token = getQueryVariable("d");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailVerifyStatus = useSelector((state) => {
    return state.userData.emailVerify;
  });
  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  React.useEffect(() => {
    if (emailVerifyStatus && !emailVerifyStatus.verified) {
      navigate("/");
    }
  }, [emailVerifyStatus, emailVerifyStatus && emailVerifyStatus.verified]);
  React.useEffect(() => {
    if (!emailVerifyStatus && token) {
      dispatch(verifyEmailVerification(token));
    }
  }, [token, emailVerifyStatus]);
  return (
    <Box sx={{
      marginLeft: "15%",
      marginRight: "15%",
      marginTop: "5%",
      marginBottom: "5%",
    }}>
      <Grid container
        alignItems='center'
        justify='center'
        style={{ minHeight: "50vh" }}>

        <Grid>
          <Typography>{getText("emailVerifySuccessMsg")}</Typography>
          <Button variant="contained" color="success" sx={{ mt: 3, mb: 2 }} onClick={() => EventBus.emit("launchSignIn")}>
            {getText("signIn")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailVerification;