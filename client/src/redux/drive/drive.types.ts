import { SET_DRIVE_STATE, SET_SELECTED_ITEM } from '../constants';

export interface DriveReducer {
  selected: SelectedItem;
  driveState: DriveState;
}

export interface SelectedItem {
  id: string;
  type: 'file' | 'folder' | '';
}
export const defaultSelectedItem: SelectedItem = {
  id: '',
  type: '',
};

export interface DriveState {
  currentDir: string;
  absolutePath: string;
}
export const defaultDriveState: DriveState = {
  currentDir: '/root',
  absolutePath: '/root',
};

export const driveReducerDefaultState: DriveReducer = {
  selected: defaultSelectedItem,
  driveState: defaultDriveState,
};

interface SetSelectedItemAction {
  type: typeof SET_SELECTED_ITEM;
  selected: SelectedItem;
}

interface SetDriveStateAction {
  type: typeof SET_DRIVE_STATE;
  driveState: DriveState;
}

export type DriveActions = SetSelectedItemAction | SetDriveStateAction;
