import { SET_DRIVE_STATE, SET_SELECTED_ITEM } from '../constants';
import {
  DriveActions,
  SelectedItem,
  DriveState,
  defaultDriveState,
} from './drive.types';

export const setSelectedItem = (selected: SelectedItem): DriveActions => ({
  type: SET_SELECTED_ITEM,
  selected,
});

export const setDriveState = (driveState: DriveState): DriveActions => ({
  type: SET_DRIVE_STATE,
  driveState,
});

export const saveDriveStateToStorage = (driveState: DriveState) => {
  localStorage.setItem('driveState', JSON.stringify(driveState));
};
export const loadDriveStateFromStorage = (): DriveState => {
  const driveStateJson = localStorage.getItem('driveState');
  return !!driveStateJson ? JSON.parse(driveStateJson) : defaultDriveState;
};
