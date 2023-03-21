import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import getText from "../../messages";
import NoRefLink from "../controls/NoRefLink";
import { changeUserPassword } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "./ChangePassword";
const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.userData.user;
  });
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dialogState, setDialogState] = React.useState(false);
  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setEmail(user.email);
    }
  }, [user]);
  return (
    <Box sx={{
      marginLeft: "15%",
      marginRight: "15%",
      marginBottom: "10%",
      marginTop: "5%",
    }}>
      {dialogState && <ChangePassword open={dialogState} closeHandler={() => {
        setDialogState(false);
      }} successHandler={(values) => {
        dispatch(changeUserPassword(values.password)).then(()=>{
          setDialogState(false);
        });
      }} />}
      <Typography variant="h6">{getText("yourAccountDetails")}</Typography>
      <Box component="form" sx={{ mt: 3 }} >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              sx={{ width: "20rem" }}
              name="firstname"
              id="firstname"
              label={getText("firstname")}
              value={firstname}
              disabled
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              sx={{ width: "20rem" }}
              id="lastname"
              label={getText("lastname")}
              name="lastname"
              value={lastname}
              disabled
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              sx={{ width: "20rem" }}
              id="email"
              label={getText("emailAddress")}
              name="email"
              value={email}
              disabled
            />
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ width: "min-content" }}>
              <TextField
                sx={{ width: "20rem" }}
                name="password"
                id="password"
                label={getText("password")}
                value="************"
                disabled
              />
              <NoRefLink
                variant="body2"
                text={getText("changePassword")}
                onClick={(oEvent) => {
                  setDialogState(true);
                  oEvent.preventDefault();
                }
                }
              />
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
