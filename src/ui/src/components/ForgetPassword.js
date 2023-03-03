import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQueryVariable } from "../utils";
import { verifyForgetPassword } from "../store/actions/userActions";
import getText from "../messages";
const ForgetPassword = (props) => {
  const token = getQueryVariable("d");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => {
    return state.userData.verifyForgetPassword;
  });
  const [showInput, setShowInput] = React.useState(false);
  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  React.useEffect(() => {
    if (status && !status.verified) {
      navigate("/");
    }
    else if(status){
      setShowInput(true);
    }
  }, [status,status && status.verified]);

  React.useEffect(() => {
    if (!status && token) {
      dispatch(verifyForgetPassword({token}));
    }
  }, [token, status]);


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
        style={{ minHeight: "50vh"}}>

        <Grid>
          <Typography>{getText("emailVerifySuccessMsg")}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgetPassword;
