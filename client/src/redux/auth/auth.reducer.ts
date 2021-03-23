import {
  LOGIN,
  LOGOUT,
  SET_USERNAME,
  SET_PROFILE_PIC,
  SET_EMAIL,
  SET_IS_AUTHENTICATED,
} from '../constants';
import { AuthReducer, defaultAuthState } from './auth.types';

const userinfoReducer = (
  state: AuthReducer = defaultAuthState,
  action: any
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.user,
        isAuthenticated: true,
      };
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    case LOGOUT:
      return defaultAuthState;
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
