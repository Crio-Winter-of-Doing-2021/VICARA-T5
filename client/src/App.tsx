import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import MaterialTheme from './assets/tsx/MaterialTheme';
import PageLoader from './components/common/Loaders/PageLoader';
import FilePreview from './components/FilePreview/FilePreview';
import ListFolder from './pages/Drive/ListFolder';
import LoginPage from './pages/Login/LoginPage';
import NotFound from './pages/NotFound/NotFound';
import {
  FILE_ROUTE,
  FOLDERS,
  FOLDER_ROUTE,
  LOGIN_ROUTE,
} from './routes/routes';

const App = () => {
  return (
    <MaterialTheme>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route exact path={LOGIN_ROUTE} component={LoginPage} />
            <Route
              exact
              path={FOLDERS}
              component={() => <Redirect to={FOLDERS + '/root'} />}
            />
            <Route path={FOLDER_ROUTE} component={ListFolder} />
            <Route path={FILE_ROUTE} component={FilePreview} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </MaterialTheme>
  );
};

export default App;
