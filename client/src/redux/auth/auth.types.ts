import { LOGIN, LOGOUT, SET_IS_AUTHENTICATED } from '../constants';

export interface Userinfo {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  emailVerified: boolean;
  providerId: string;
  isAuthenticated: boolean;
}

export const defaultAuthState: Userinfo = {
  isAuthenticated: false,
  displayName: '',
  email: '',
  photoURL: '',
  uid: '',
  emailVerified: false,
  providerId: '',
};

export type AuthReducer = Userinfo;

interface LoginAction {
  type: typeof LOGIN;
  user: Partial<AuthReducer>;
}
interface LogoutAction {
  type: typeof LOGOUT;
}
interface SetIsAuthenticatedAction {
  type: typeof SET_IS_AUTHENTICATED;
  isAuthenticated: boolean;
}

export type AuthActions = LoginAction | LogoutAction | SetIsAuthenticatedAction;
