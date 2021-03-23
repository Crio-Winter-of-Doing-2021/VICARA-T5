import React, { lazy, Suspense } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../../../redux/auth/auth.selectors';
import DottedLineLoader from '../Loaders/Loader';
import { FOLDERS } from '../../../routes/routes';

const LogoText = lazy(() => import('./LogoText'));
const UserProfile = lazy(() => import('./UserProfile'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: '60px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
}));

interface AppbarProps {
  pageTitle?: string;
  displayBackBtn?: boolean;
}

const Appbar = ({ pageTitle, displayBackBtn }: AppbarProps) => {
  const classes = useStyles();
  const location = useLocation() as any;

  const authenticated = useSelector(selectIsAuthenticated);

  // const Icon = icons[icon];
  return (
    <div>
      <div className={classes.root}>
        <AppBar position='fixed' className={classes.appBar} color='default'>
          <Toolbar
            className='header'
            style={{ justifyContent: 'space-between' }}
          >
            <div className='flex items-center'>
              {displayBackBtn && (
                <Link
                  to={
                    !!location.state &&
                    location.state.hasOwnProperty('prevPath')
                      ? location.state.prevPath
                      : FOLDERS
                  }
                >
                  <IconButton>
                    <ArrowBack />
                  </IconButton>
                </Link>
              )}
              <Suspense fallback={<DottedLineLoader />}>
                <LogoText />
              </Suspense>
            </div>
            <Typography className='ml1' variant='h6' color='inherit'>
              <span>{pageTitle || ''}</span>
            </Typography>
            {authenticated && (
              <Suspense fallback={<DottedLineLoader />}>
                <div className='flex'>
                  <UserProfile />
                </div>
              </Suspense>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </div>
  );
};

export default Appbar;
