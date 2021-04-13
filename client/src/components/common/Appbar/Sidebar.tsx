import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Star as Starred,
  Storage,
  AccessTime as Recents,
} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { FOLDERS, STARRED_ROUTE, RECENTS_ROUTE } from '../../../routes/routes';
import BootstrapTooltip from '../BootstrapTooltip';

const items = [
  {
    text: 'My Drive',
    link: FOLDERS,
    Icon: Storage,
  },
  {
    text: 'Starred',
    link: STARRED_ROUTE,
    Icon: Starred,
  },
  {
    text: 'Recents',
    link: RECENTS_ROUTE,
    Icon: Recents,
  },
];

const Sidebar = () => {
  return (
    <>
      <List>
        {items.map((item, i) => (
          <NavLink className='nav-style' to={item.link} key={i}>
            <BootstrapTooltip title={item.text} placement='right'>
              <ListItem button>
                <ListItemIcon>
                  <item.Icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </BootstrapTooltip>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List></List>
    </>
  );
};

export default Sidebar;
