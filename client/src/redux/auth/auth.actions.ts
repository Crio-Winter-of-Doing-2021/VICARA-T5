import { LOGIN, LOGOUT } from "../constants";
import { AuthActions, AuthReducer } from "./auth.types";

export const login = (user: Partial<AuthReducer>): AuthActions => ({
  type: LOGIN,
  user,
});

export const logout = (): AuthActions => ({
  type: LOGOUT,
});
