import * as React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import getText from "../../messages";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deleteMeeting, resendMeetingInvite } from "../../store/actions/meetingsActions";
import { useDispatch } from "react-redux";
import moment from "moment";
import { formatAMPM } from "../../utils";

export default function ItemsList(props) {
  const dispatch = useDispatch();
  const items = props.items;
  const [openedItem, setOpenedItem] = React.useState("");
  const handleSelect = (panel) => (oEvent) => {
    if (openedItem === panel) {
      setOpenedItem("");
    } else {
      setOpenedItem(panel);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openedMenu, setOpenedMenu] = React.useState("");
  const handleMenuSelection = (menuId) => (oEvent) => {
    if (openedMenu === menuId) {
      setOpenedMenu("");
    } else {
      setOpenedMenu(menuId);
      setAnchorEl(oEvent.currentTarget);
    }
    oEvent.stopPropagation();
  };
  return (
    <List sx={{
      bgcolor: 'background.paper',
      position: 'relative',
      overflow: 'auto',
      '& ul': { padding: 0 },
    }}>
      {items ? items.map((item, index) => {
        const key = item.id;
        return (<React.Fragment key={index}>
          <ListItem key={key + "listitem"}>
            <Box sx={{ width: "100%" }} >
              <ListItemButton onClick={handleSelect(key)} sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <Typography component='div' fontWeight={"fontWeightMedium"}>
                  {item.status === "active" ? item.title : `${getText("canceled")} ${item.title}`}
                </Typography>
                <Box>
                  {item.status === "active" && new Date(item.end).getTime() > Date.now() && new Date(item.start).getTime() < Date.now()
                    || new Date(item.start).getTime() - 900000 < Date.now()
                    && new Date(item.start).getTime() > Date.now() ?
                    <Button variant="contained" color="success" sx={{ marginLeft: ".5rem", marginRight: ".5rem" }}
                      onClick={
                        (oEvent) => {
                          oEvent.stopPropagation()
                          window.open(item.joiningLink, "_blank");
                        }
                      }>
                      {
                        getText("join")
                      } </Button> : null}
                  <IconButton aria-label="comment" onClick={handleSelect(key)} sx={{ marginLeft: ".5rem", marginRight: ".5rem" }}>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                  <IconButton aria-label="comment" onClick={handleMenuSelection(key)} sx={{ marginLeft: ".5rem", marginRight: ".5rem" }}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openedMenu === key}
                    onClose={(oEvent) => {
                      setOpenedMenu("");
                      setAnchorEl(null);
                      oEvent.stopPropagation()
                    }}
                  >
                    {[getText("view"), getText("edit"), getText("cancel"), getText("sendNotification")].map((action) => (
                      <MenuItem
                        data-key={action}
                        key={action}
                        onClick={(oEvent) => {
                          oEvent.stopPropagation();
                          const actionType = oEvent.target.getAttribute("data-key");
                          if (actionType == getText("view")) {
                            setOpenedItem(key);
                          }
                          else if (actionType == getText("edit")) {
                            // 
                          }
                          else if (actionType == getText("sendNotification")) {
                            dispatch(resendMeetingInvite(key));
                          }
                          else if (actionType == getText("cancel")) {
                            //dispatch(deleteMeeting(key));
                          }
                          setOpenedMenu("");
                          setAnchorEl(null);
                        }}
                      >
                        <Typography
                          data-key={action}
                          key={action}
                          textAlign="center"
                        >
                          {action}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </ListItemButton>
              <Collapse key={key + "collapse"} in={openedItem === key} timeout="auto" unmountOnExit sx={{
                backgroundColor: 'rgba(255, 255, 255, .05)',
                padding: "1rem"
              }}>
                {item.description ? <Typography>
                  {item.description}
                </Typography> : null}
                {Array.isArray(item.members) && item.members.length ? <Typography>
                  {getText("additionalParticipants") + " : " + item.members.join(", ")}
                </Typography> : null}
                <Typography>
                  {`${getText("timing")} : ${new Date(item.start).toDateString()} - ${formatAMPM(moment(item.start))} - ${formatAMPM(moment(item.end))}`}
                </Typography>
                <Typography>
                  {getText("createdAt") + " : " + new Date(item.createdAt).toLocaleString()}
                </Typography>
                <Typography>
                  {getText("modifiedAt") + " : " + new Date(item.modifiedAt).toLocaleString()}
                </Typography>
              </Collapse>
            </Box>
          </ListItem>
          {items.length - 1 !== index ? <Divider key={key + "divider"} variant="" component="li" /> : null}
        </React.Fragment>)
      })
        : null}
    </List>
  );
}