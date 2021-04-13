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

const Sidebar = () => {
  return (
    <>
      <List>
        <NavLink className='nav-style' to={FOLDERS}>
          <ListItem button>
            <ListItemIcon>
              <Storage />
            </ListItemIcon>
            <ListItemText primary={'My Drive'} />
          </ListItem>
        </NavLink>
        <NavLink className='nav-style' to={STARRED_ROUTE}>
          <ListItem button>
            <ListItemIcon>
              <Starred />
            </ListItemIcon>
            <ListItemText primary={'Starred'} />
          </ListItem>
        </NavLink>
        <NavLink className='nav-style' to={RECENTS_ROUTE}>
          <ListItem button>
            <ListItemIcon>
              <Recents />
            </ListItemIcon>
            <ListItemText primary={'Recents'} />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List></List>
    </>
  );
};

export default Sidebar;
