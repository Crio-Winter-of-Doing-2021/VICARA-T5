import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './redux/store/configureStore';
import MaterialTheme from './assets/tsx/MaterialTheme';
import PageLoader from './components/common/Loaders/PageLoader';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import {
  FOLDERS,
  FOLDER_ROUTE,
  LOGIN_ROUTE,
  RECENTS_ROUTE,
  STARRED_ROUTE,
} from './routes/routes';

const ListFolder = lazy(() => import('./pages/Drive/ListFolder'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const StarredItems = lazy(() => import('./pages/StarredItems/StarredItems'));
const RecentsPage = lazy(() => import('./pages/Recents/RecentsPage'));

const Appbar = lazy(() => import('./components/common/Appbar/Appbar'));

const persistor = persistStore(store);

export const routes: { [key: string]: string } = {
  [LOGIN_ROUTE]: '',
  [FOLDERS]: 'Home',
  [RECENTS_ROUTE]: 'Recents',
  [STARRED_ROUTE]: 'Starred',
};

const App = () => {
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
              <PrivateRoute path={STARRED_ROUTE} component={StarredItems} />
              <PrivateRoute path={RECENTS_ROUTE} component={RecentsPage} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </PersistGate>
      </Router>
    </MaterialTheme>
  );
};

export default App;
