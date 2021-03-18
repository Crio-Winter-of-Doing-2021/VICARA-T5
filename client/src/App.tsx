import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageLoader from "./components/common/Loaders/PageLoader";
import FilePreview from "./components/FilePreview/FilePreview";
import ListFolder from "./pages/Drive/ListFolder";
import LoginPage from "./pages/Login/LoginPage";
import { FILE_ROUTE, FOLDER_ROUTE, LOGIN_ROUTE } from "./routes/routes";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Route exact path={LOGIN_ROUTE} component={LoginPage} />
        <Route path={FOLDER_ROUTE} component={ListFolder} />
        <Route path={FILE_ROUTE} component={FilePreview} />
      </Suspense>
    </Router>
  );
};

export default App;
