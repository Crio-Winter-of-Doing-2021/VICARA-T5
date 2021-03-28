import { SET_SELECTED_ITEM } from '../constants';

export interface SelectedItem {
  id: string;
  type: 'file' | 'folder' | '';
}

export interface DriveReducer {
  selected: SelectedItem;
}

export const driveReducerDefaultState: DriveReducer = {
  selected: {
    id: '',
    type: '',
  },
};

interface SetSelectedItemAction {
  type: typeof SET_SELECTED_ITEM;
  selected: SelectedItem;
}

export type DriveActions = SetSelectedItemAction;
