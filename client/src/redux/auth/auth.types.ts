import { LOGIN, LOGOUT } from "../constants";

export interface Userinfo {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  emailVerified: boolean;
  providerId: string;
}

export const defaultAuthState: Userinfo = {
  displayName: "",
  email: "",
  photoURL: "",
  uid: "",
  emailVerified: false,
  providerId: "",
};

export type AuthReducer = Userinfo;

interface LoginAction {
  type: typeof LOGIN;
  user: Partial<AuthReducer>;
}
interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
