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
import ItemsList from "../controls/ItemsList";
import MainCard from "../controls/MainCard";

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
              <Typography margin={"1rem"} sx={{ alignSelf: "center" }}>{getText("or")}</Typography>
              <Button variant="contained" color="success" sx={{ mt: 3, mb: 2 }} onClick={() => EventBus.emit("launchSignUp")}>
                {getText("signUp")}
              </Button>
            </Box>
          </Grid>
        </Grid> :
          <Grid container>
            <Grid item sx={{paddingRight:"1rem"}}>
              <MainCard title={getText("Meetings")}>
                <ItemsList />
              </MainCard>
            </Grid>
            <Grid item xs={7}>
              <MainCard title={getText("meetingDetails")}>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
                  ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
                  reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
                  qui officiate descent molls anim id est labours.
                </Typography>
              </MainCard>
            </Grid>
          </Grid>}
      </Grid>
    </Box>
  );
};

export default Meeting;
