import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import MaterialTheme from './assets/tsx/MaterialTheme';
import PageLoader from './components/common/Loaders/PageLoader';
import { loadAuthStateFromStorage, login } from './redux/auth/auth.actions';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import {
  FILE_ROUTE,
  FOLDERS,
  FOLDER_ROUTE,
  LOGIN_ROUTE,
} from './routes/routes';

const FilePreview = lazy(() => import('./components/FilePreview/FilePreview'));
const ListFolder = lazy(() => import('./pages/Drive/ListFolder'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const Appbar = lazy(() => import('./components/common/Appbar/Appbar'));

const App = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);

  useEffect(() => {
    const authState = loadAuthStateFromStorage();
    isMounted.current = true;
    if (authState.isAuthenticated && isMounted.current) {
      dispatch(login(authState));
    }
    // console.log(authState);
    return () => {
      isMounted.current = false;
    };
  }, [dispatch]);

  return (
    <MaterialTheme>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Appbar />
          <Switch>
            <PublicRoute exact path={LOGIN_ROUTE} component={LoginPage} />
            <PrivateRoute
              exact
              path={FOLDERS}
              component={() => <Redirect to={FOLDERS + '/root'} />}
            />
            <PrivateRoute path={FOLDER_ROUTE} component={ListFolder} />
            <PrivateRoute path={FILE_ROUTE} component={FilePreview} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </MaterialTheme>
  );
};

export default App;
