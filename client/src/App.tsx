import React, { Suspense, lazy /* , useEffect, useRef */ } from 'react';
// import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './redux/store/configureStore';
import MaterialTheme from './assets/tsx/MaterialTheme';
import PageLoader from './components/common/Loaders/PageLoader';
// import { login } from './redux/auth/auth.actions';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import {
  FILE_ROUTE,
  FOLDERS,
  FOLDER_ROUTE,
  LOGIN_ROUTE,
  STARRED_ROUTE,
} from './routes/routes';
import StarredItems from './pages/StarredItems/StarredItems';

const FilePreview = lazy(() => import('./components/FilePreview/FilePreview'));
const ListFolder = lazy(() => import('./pages/Drive/ListFolder'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const Appbar = lazy(() => import('./components/common/Appbar/Appbar'));

const persistor = persistStore(store);

const App = () => {
  // const dispatch = useDispatch();
  // const isMounted = useRef(true);

  // useEffect(() => {
  //   const authState = loadAuthStateFromStorage();
  //   isMounted.current = true;
  //   if (authState.isAuthenticated && isMounted.current) {
  //     dispatch(login(authState));
  //   }
  //   // console.log(authState);
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [dispatch]);

  return (
    <MaterialTheme>
      <Router>
        <PersistGate persistor={persistor}>
          <Suspense fallback={<PageLoader />}>
            <Appbar />
            <Switch>
              <PublicRoute exact path={LOGIN_ROUTE} component={LoginPage} />
              <PrivateRoute exact path={FOLDERS} component={ListFolder} />
              <PrivateRoute path={FOLDER_ROUTE} component={ListFolder} />
              <PrivateRoute path={FILE_ROUTE} component={FilePreview} />
              <PrivateRoute path={STARRED_ROUTE} component={StarredItems} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </PersistGate>
      </Router>
    </MaterialTheme>
  );
};

export default App;
