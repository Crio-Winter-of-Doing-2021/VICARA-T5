import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { FOLDERS } from '../../../routes/routes';

const LogoText = () => {
  const location = useLocation();
  return (
    <NavLink
      to={{
        pathname: FOLDERS,
        state: { prevPath: location.pathname },
      }}
      className='nav-style flex'
    >
      <Typography
        className='ml1'
        variant='h5'
        color='inherit'
        style={{ fontWeight: 600 }}
      >
        <span>Vicara Drive</span>
      </Typography>
    </NavLink>
  );
};

export default LogoText;
