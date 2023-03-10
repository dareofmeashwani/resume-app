import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

export default function ItemsList(props) {
  const onSelect = props.onSelect;
  const items = props.items;
  return (
    <List sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper',
      position: 'relative',
      overflow: 'auto',
      maxHeight: 400,
      '& ul': { padding: 0 },
    }}>
      {items ? items.map((item, index) => {

        return (<><ListItem alignItems="flex-start" secondaryAction={
          <IconButton aria-label="comment">
            <ArrowForwardIosIcon />
          </IconButton>
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
          {items.length - 1 !== index ? <Divider variant="" component="li" /> : null}
        </>)
      })
        : null}
    </List>
  );
}