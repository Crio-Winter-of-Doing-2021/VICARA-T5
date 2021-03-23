import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle, PowerSettingsNew } from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

// import { LazyImage } from '../common/LazyImage';
import { selectDisplayName } from '../../../redux/auth/auth.selectors';

import CustomMenu from '../Menu/CustomMenu';
import {
  logout,
  clearAuthStateFromStorage,
} from '../../../redux/auth/auth.actions';
import { ApiRoot } from '../../../assets/ts/api';

const UserProfile = () => {
  const { name } = useSelector(
    createStructuredSelector({
      name: selectDisplayName,
    })
  );
  const dispatch = useDispatch();

  const startLogout = () => {
    fetch(ApiRoot + '/logout')
      .then(() => {
        dispatch(logout());
        clearAuthStateFromStorage();
      })
      .catch((e) => {
        console.log('Error logging out... ', e);
      });
  };

  return (
    <CustomMenu
      menuName='profile'
      iconBtnProps={{ size: 'small' }}
      buttonContent={
        // photoURL ? (
        //   <img
        //     alt='profile pic'
        //     src={photoURL}
        //     width='35'
        //     height='35'
        //     className='br-100'
        //   />
        // ) :
        // (
        <AccountCircle style={{ width: 35, height: 35 }} />
        // )
      }
      overrideHeight={450}
      //   buttonTooltipText={name + '\n' + email}
    >
      <div className='outline-0'>
        <List>
          <div className='tc f4'>{name || ''}</div>
          <div>
            <ListItem button onClick={startLogout}>
              <ListItemIcon>
                <PowerSettingsNew />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </div>
        </List>
      </div>
    </CustomMenu>
  );
};

export default UserProfile;
