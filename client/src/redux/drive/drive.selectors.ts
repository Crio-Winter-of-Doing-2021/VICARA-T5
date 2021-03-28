import { createSelector } from 'reselect';
import { DriveReducer } from './drive.types';

export const selectDrive = (state: any): DriveReducer => state.drive;

export const selectSelectedItem = createSelector(
  [selectDrive],
  (drive) => drive.selected
);
