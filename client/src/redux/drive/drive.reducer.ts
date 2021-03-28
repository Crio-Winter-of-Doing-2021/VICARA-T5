import { SET_SELECTED_ITEM } from '../constants';
import {
  DriveActions,
  DriveReducer,
  driveReducerDefaultState,
} from './drive.types';

const driveReducer = (
  state: DriveReducer = driveReducerDefaultState,
  action: DriveActions
) => {
  switch (action.type) {
    case SET_SELECTED_ITEM:
      return {
        ...state,
        selected: action.selected,
      };
    default:
      return state;
  }
};

export default driveReducer;
