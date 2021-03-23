import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/auth/auth.selectors';
import { FOLDERS } from './routes';

interface IProps {
  component: any;
  [x: string]: any;
}

const PublicRoute = ({ component: Component, ...rest }: IProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Route
      {...rest}
      component={(props: any) => {
        if (!isAuthenticated)
          return (
            <div>
              <Component {...props} />
            </div>
          );
        return <Redirect to={{ pathname: FOLDERS }} />;
      }}
    />
  );
};

export default PublicRoute;
