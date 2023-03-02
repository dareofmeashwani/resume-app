import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQueryVariable } from "../utils";
import { initiateEmailVerification } from "../store/actions/userActions";
import getText from "../messages";
const EmailVerification = (props) => {
  const token = getQueryVariable("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailVerifyStatus = useSelector((state) => {
    return state.userData.emailVerify;
  });
  React.useEffect(() => {
    if (!emailVerifyStatus && token) {
      dispatch(initiateEmailVerification(token));
    }
    if (!token) {
      navigate("/");
    }
  }, [token]);
  if (emailVerifyStatus && !emailVerifyStatus.verified) {
    navigate("/");
  }
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
        style={{ minHeight: "50vh", minWidth: "100vh" }}>

        <Grid item xs='auto'>
          <Typography>{getText("emailVerifySuccessMsg")}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailVerification;
