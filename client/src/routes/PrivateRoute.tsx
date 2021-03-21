import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { selectUserId } from '../redux/auth/auth.selectors';
import { LOGIN_ROUTE } from './routes';

interface IProps {
  // authLoading: boolean;
  component: any;
  [x: string]: any;
}

const PrivateRoute = ({
  // authLoading,
  component: Component,
  ...rest
}: IProps) => {
  const isAuthenticated = useSelector(selectUserId);
  const location = useLocation();
  return (
    <Route
      {...rest}
      component={(props: any) => {
        if (!!isAuthenticated)
          return (
            <div>
              <Component {...props} />
            </div>
          );
        else {
          localStorage.setItem('redirect_to', location.pathname);
          return (
            <Redirect
              to={{
                pathname: LOGIN_ROUTE,
                state: { prevPath: location.pathname },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
