import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQueryVariable } from "../utils";
import { verifyForgetPassword } from "../store/actions/userActions";
import getText from "../messages";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../utils";
const ForgetPassword = (props) => {
  const token = getQueryVariable("d");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const password = Yup.string()
    .required(getText("inputPasswordRequired"))
    .min(8, getText("inputPasswordMinLenWarning"));
  const confirmPassword = Yup.string()
    .required(getText("inputPasswordRequired"))
    .min(8, getText("inputPasswordMinLenWarning"));

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validate: async (values) => {
      const errors = {}
      try {
        await password.validate(values.password);
      } catch (err) {
        errors.password = err.message
      }
      try {
        await confirmPassword.validate(values.confirmPassword);
      } catch (err) {
        errors.confirmPassword = err.message
      }
      if (Object.keys(errors).length == 0 && values.confirmPassword != values.password) {
        errors.confirmPassword = getText("passwordNotMatching");
        errors.password = getText("passwordNotMatching")
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(verifyForgetPassword({ token, password: values.password }));
    }
  });

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
    else if (status) {
      setShowInput(true);
    }
  }, [status, status && status.verified]);

  React.useEffect(() => {
    if (!status && token) {
      dispatch(verifyForgetPassword({ token }));
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
        style={{ minHeight: "50vh" }}>
        <Grid>
          {status && status.isPasswordSend && status.verified ? <Typography>
            {getText("passwordChangedSucessfully")}
          </Typography> :
            showInput ?
              <Box>
                <Typography>{getText("forgetPasswordScreenTitle")}</Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                  <Grid>
                    <TextField
                      autoFocus
                      required
                      sx={{
                        width: "15rem"
                      }}
                      margin="normal"
                      name="password"
                      label={getText("password")}
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...formik.getFieldProps("password")}
                      {...errorHelper(formik, "password")}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      required
                      fullWidth
                      sx={{
                        width: "15rem"
                      }}
                      margin="normal"
                      name="confirmPassword"
                      label={getText("confirmPassword")}
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      {...formik.getFieldProps("confirmPassword")}
                      {...errorHelper(formik, "confirmPassword")}
                    />
                  </Grid>
                  <Grid>
                    <Button type="submit" variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
                      {getText("Save")}
                    </Button>
                  </Grid>
                </Box>
              </Box> : null
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgetPassword;
