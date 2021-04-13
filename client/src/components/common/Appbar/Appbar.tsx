import React, { lazy, Suspense } from 'react';
import {
  AppBar,
  Drawer,
  Divider,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { ArrowBack, Menu as MenuIcon, ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../../../redux/auth/auth.selectors';
import DottedLineLoader from '../Loaders/Loader';
import { FOLDERS } from '../../../routes/routes';
import Sidebar from './Sidebar';

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
    // height: '60px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

interface AppbarProps {
  pageTitle?: string;
  displayBackBtn?: boolean;
}

const drawerWidth = 240;

const Appbar = ({ pageTitle, displayBackBtn }: AppbarProps) => {
  const classes = useStyles();
  const location = useLocation() as any;

  const authenticated = useSelector(selectIsAuthenticated);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color='default'
        >
          <Toolbar
            className='header'
            style={{ justifyContent: 'space-between' }}
          >
            <div className='flex'>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
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
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />
          <Sidebar />
        </Drawer>
      </div>
      {/* <div className={classes.content}>
        <div className={classes.toolbar} />
      </div> */}
    </div>
  );
};

export default Appbar;
