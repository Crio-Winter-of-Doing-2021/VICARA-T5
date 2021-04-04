import {
  ADD_FILE,
  ADD_FOLDER,
  SET_DRIVE_CONTENT,
  SET_DRIVE_STATE,
  SET_SELECTED_ITEM,
} from '../constants';
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
    case SET_DRIVE_STATE:
      return {
        ...state,
        driveState: action.driveState,
      };
    case SET_DRIVE_CONTENT:
      return { ...state, content: action.content };
    case ADD_FOLDER:
      return {
        ...state,
        content: {
          ...state.content,
          folders: [...state.content.folders, action.folder],
        },
      };
    case ADD_FILE:
      return {
        ...state,
        content: {
          ...state.content,
          files: [...state.content.files, action.file],
        },
      };
    default:
      return state;
  }
};

export default driveReducer;
