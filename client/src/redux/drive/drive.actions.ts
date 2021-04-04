import { IItem } from '../../pages/Drive/ListFolderItems';
import {
  ADD_FILE,
  ADD_FOLDER,
  SET_DRIVE_CONTENT,
  SET_DRIVE_STATE,
  SET_SELECTED_ITEM,
} from '../constants';
import {
  DriveActions,
  SelectedItem,
  DriveState,
  DriveContent,
} from './drive.types';

export const setSelectedItem = (selected: SelectedItem): DriveActions => ({
  type: SET_SELECTED_ITEM,
  selected,
});

export const setDriveState = (driveState: DriveState): DriveActions => ({
  type: SET_DRIVE_STATE,
  driveState,
});

export const setDriveContent = (content: DriveContent): DriveActions => ({
  type: SET_DRIVE_CONTENT,
  content,
});

export const addFile = (file: IItem): DriveActions => ({
  type: ADD_FILE,
  file,
});

export const addFolder = (folder: IItem): DriveActions => ({
  type: ADD_FOLDER,
  folder,
});

// export const saveDriveStateToStorage = (driveState: DriveState) => {
//   localStorage.setItem('driveState', JSON.stringify(driveState));
// };
// export const loadDriveStateFromStorage = (): DriveState => {
//   const driveStateJson = localStorage.getItem('driveState');
//   return !!driveStateJson ? JSON.parse(driveStateJson) : defaultDriveState;
// };
