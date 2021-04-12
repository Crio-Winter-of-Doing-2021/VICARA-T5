import { createSelector } from 'reselect';
import { DriveReducer } from './drive.types';

export const selectDrive = (state: any): DriveReducer => state.drive;

export const selectSelectedItem = createSelector(
  [selectDrive],
  (drive) => drive.selected
);

export const selectDriveState = createSelector(
  [selectDrive],
  (drive) => drive.driveState
);

export const selectDriveContent = createSelector(
  [selectDrive],
  (drive) => drive.content
);

export const selectSelectedItemName = (id: string) =>
  createSelector([selectSelectedItem, selectDriveContent], (item, content) =>
    item.type === 'file' && content.files[id]
      ? content.files[id].name
      : content.folders[id]
      ? content.folders[id].name
      : ''
  );
