import { deletePropFromObject } from '../../assets/ts/utilities';
import {
  ADD_FILE,
  ADD_FOLDER,
  CLEAR_SELECTED_ITEM,
  DELETE_FILE,
  DELETE_FOLDER,
  EDIT_FILE,
  EDIT_FOLDER,
  SET_CLOUD_PROVIDER,
  SET_DRIVE_CONTENT,
  SET_DRIVE_STATE,
  SET_SELECTED_ITEM,
} from '../constants';
import {
  defaultSelectedItem,
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
    case CLEAR_SELECTED_ITEM:
      return {
        ...state,
        selected: defaultSelectedItem,
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
          folders: {
            ...state.content.folders,
            [action.id]: action.folder,
          },
        },
      };
    case ADD_FILE:
      return {
        ...state,
        content: {
          ...state.content,
          files: {
            ...state.content.files,
            [action.id]: action.file,
          },
        },
      };
    case SET_CLOUD_PROVIDER:
      return {
        ...state,
        driveState: {
          ...state.driveState,
          cloudProvider: action.provider,
        },
      };
    case EDIT_FILE:
      return {
        ...state,
        content: {
          ...state.content,
          files: {
            ...state.content.files,
            [action.id]: {
              ...state.content.files[action.id],
              ...action.file,
            },
          },
        },
      };
    case EDIT_FOLDER:
      return {
        ...state,
        content: {
          ...state.content,
          folders: {
            ...state.content.folders,
            [action.id]: {
              ...state.content.folders[action.id],
              ...action.folder,
            },
          },
        },
      };
    case DELETE_FILE:
      return {
        ...state,
        content: {
          ...state.content,
          files: deletePropFromObject(state.content.files, action.id),
        },
      };
    case DELETE_FOLDER:
      return {
        ...state,
        content: {
          ...state.content,
          folders: deletePropFromObject(state.content.folders, action.id),
        },
      };
    default:
      return state;
  }
};

export default driveReducer;
