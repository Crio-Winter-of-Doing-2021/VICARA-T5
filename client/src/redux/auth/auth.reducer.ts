import {
  LOGIN,
  LOGOUT,
  SET_USERNAME,
  SET_PROFILE_PIC,
  SET_EMAIL,
} from "../constants";
import { AuthReducer, defaultAuthState } from "./auth.types";

const userinfoReducer = (
  state: AuthReducer = defaultAuthState,
  action: any
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...action.user,
      };
    case LOGOUT:
      return {};
    case SET_USERNAME:
      return {
        ...state,
        displayName: action.displayName,
      };
    case SET_PROFILE_PIC:
      return {
        ...state,
        photoURL: action.photoURL,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  }
};

export default userinfoReducer;
