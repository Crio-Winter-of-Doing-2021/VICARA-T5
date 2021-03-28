import { SET_SELECTED_ITEM } from '../constants';
import { DriveActions, SelectedItem } from './drive.types';

export const setSelectedItem = (selected: SelectedItem): DriveActions => ({
  type: SET_SELECTED_ITEM,
  selected,
});
