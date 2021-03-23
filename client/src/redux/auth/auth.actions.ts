import { LOGIN, LOGOUT, SET_IS_AUTHENTICATED } from '../constants';
import { AuthActions, AuthReducer, defaultAuthState } from './auth.types';

export const login = (user: Partial<AuthReducer>): AuthActions => ({
  type: LOGIN,
  user,
});

export const logout = (): AuthActions => ({
  type: LOGOUT,
});

export const setIsAuthenticated = (isAuthenticated: boolean): AuthActions => ({
  type: SET_IS_AUTHENTICATED,
  isAuthenticated,
});

export const saveAuthStateToStorage = (authState: Partial<AuthReducer>) => {
  localStorage.setItem('authState', JSON.stringify(authState));
};

export const loadAuthStateFromStorage = (): AuthReducer => {
  const authStateJson = localStorage.getItem('authState');
  return !!authStateJson ? JSON.parse(authStateJson) : defaultAuthState;
};

export const clearAuthStateFromStorage = () => {
  localStorage.removeItem('authState');
};
