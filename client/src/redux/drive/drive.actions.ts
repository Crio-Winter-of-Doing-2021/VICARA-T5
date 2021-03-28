import { SET_SELECTED_ITEM } from '../constants';
import { DriveActions, SelectedItem } from './drive.types';

export const setSelectedItem = (selected: SelectedItem): DriveActions => ({
  type: SET_SELECTED_ITEM,
  selected,
});

interface DriveState {
  currentDir: string;
  absolutePath: string;
}

export const defaultDriveState: DriveState = {
  currentDir: '/root',
  absolutePath: '/root',
};

export const saveDriveStateToStorage = (driveState: DriveState) => {
  localStorage.setItem('driveState', JSON.stringify(driveState));
};
export const loadDriveStateFromStorage = (): DriveState => {
  const driveStateJson = localStorage.getItem('driveState');
  return !!driveStateJson ? JSON.parse(driveStateJson) : defaultDriveState;
};
