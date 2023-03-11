import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

export default function ItemsList(props) {
  const onSelect = props.onSelect;
  const items = props.items;
  const [openedItem, setOpenedItem] = React.useState("");

  const handleSelect = (panel) => (event, isExpanded) => {
    if (openedItem === panel) {
      setOpenedItem("");
    } else {
      setOpenedItem(panel);
    }
  };
  return (
    <List sx={{
      width: '100%',
      bgcolor: 'background.paper',
      position: 'relative',
      overflow: 'auto',
      '& ul': { padding: 0 },
    }}>
      {items ? items.map((item, index) => {
        const key = item.id;
        return (<><ListItem key={key + "listitem"} alignItems="flex-start" secondaryAction={
          <>
            <IconButton aria-label="comment" onClick={handleSelect(key)} sx={{ margin: ".5rem" }}>
              <KeyboardArrowDownIcon />
            </IconButton>
            <IconButton aria-label="comment" onClick={handleSelect(key)} sx={{ margin: ".5rem" }}>
              <MoreVertIcon />
            </IconButton>
          </>
        }>
          <ListItemText
            primary={item.title}
            secondary={
              <React.Fragment>
                <Typography>
                  {item.description}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
          <Collapse key={key + "collapse"} in={openedItem === key} timeout="auto" unmountOnExit>
            <Typography>
              {item.description}
            </Typography>
          </Collapse>
          {items.length - 1 !== index ? <Divider key={key + "divider"} variant="" component="li" /> : null}
        </>)
      })
        : null}
    </List>
  );
}