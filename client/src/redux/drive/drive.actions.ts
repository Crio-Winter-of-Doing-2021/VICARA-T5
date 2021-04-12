import {
  ADD_FILE,
  ADD_FOLDER,
  DELETE_FILE,
  DELETE_FOLDER,
  EDIT_FILE,
  EDIT_FOLDER,
  SET_CLOUD_PROVIDER,
  SET_DRIVE_CONTENT,
  SET_DRIVE_STATE,
  SET_SELECTED_ITEM,
  CLEAR_SELECTED_ITEM,
} from '../constants';
import {
  DriveActions,
  SelectedItem,
  DriveState,
  DriveContent,
  ProviderType,
  IItem,
} from './drive.types';

export const setSelectedItem = (selected: SelectedItem): DriveActions => ({
  type: SET_SELECTED_ITEM,
  selected,
});
export const clearSelectedItem = (): DriveActions => ({
  type: CLEAR_SELECTED_ITEM,
});

export const setDriveState = (driveState: DriveState): DriveActions => ({
  type: SET_DRIVE_STATE,
  driveState,
});

export const setDriveContent = (content: DriveContent): DriveActions => ({
  type: SET_DRIVE_CONTENT,
  content,
});

export const addFile = (id: string, file: IItem): DriveActions => ({
  type: ADD_FILE,
  id,
  file,
});

export const addFolder = (id: string, folder: IItem): DriveActions => ({
  type: ADD_FOLDER,
  id,
  folder,
});

export const setCloudProvider = (provider: ProviderType): DriveActions => ({
  type: SET_CLOUD_PROVIDER,
  provider,
});

export const editFolder = (
  id: string,
  folder: Partial<IItem>
): DriveActions => ({
  type: EDIT_FOLDER,
  id,
  folder,
});
export const editFile = (id: string, file: Partial<IItem>): DriveActions => ({
  type: EDIT_FILE,
  id,
  file,
});

export const deleteFolder = (id: string): DriveActions => ({
  type: DELETE_FOLDER,
  id,
});
export const deleteFile = (id: string): DriveActions => ({
  type: DELETE_FILE,
  id,
});

// export const saveDriveStateToStorage = (driveState: DriveState) => {
//   localStorage.setItem('driveState', JSON.stringify(driveState));
// };
// export const loadDriveStateFromStorage = (): DriveState => {
//   const driveStateJson = localStorage.getItem('driveState');
//   return !!driveStateJson ? JSON.parse(driveStateJson) : defaultDriveState;
// };
