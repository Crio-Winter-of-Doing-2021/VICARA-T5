import { provider_azure, provider_s3 } from '../../assets/ts/api';
import { IItem } from '../../pages/Drive/ListFolderItems';
import {
  ADD_FILE,
  ADD_FOLDER,
  SET_CLOUD_PROVIDER,
  SET_DRIVE_CONTENT,
  SET_DRIVE_STATE,
  SET_SELECTED_ITEM,
} from '../constants';

export type ProviderType = typeof provider_azure | typeof provider_s3;

export interface DriveReducer {
  selected: SelectedItem;
  driveState: DriveState;
  content: DriveContent;
}

export interface DriveContent {
  files: IItem[];
  folders: IItem[];
}
const defaultDriveContent: DriveContent = {
  files: [],
  folders: [],
};

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
  absIdPath: string;
  cloudProvider: ProviderType;
}
export const defaultDriveState: DriveState = {
  currentDir: '/root',
  absolutePath: '/root',
  absIdPath: '/root',
  cloudProvider: provider_azure,
};

export const driveReducerDefaultState: DriveReducer = {
  selected: defaultSelectedItem,
  driveState: defaultDriveState,
  content: defaultDriveContent,
};

interface SetSelectedItemAction {
  type: typeof SET_SELECTED_ITEM;
  selected: SelectedItem;
}

interface SetDriveStateAction {
  type: typeof SET_DRIVE_STATE;
  driveState: DriveState;
}
interface SetDriveContentAction {
  type: typeof SET_DRIVE_CONTENT;
  content: DriveContent;
}
interface AddDriveFileAction {
  type: typeof ADD_FILE;
  file: IItem;
}
interface AddDriveFolderAction {
  type: typeof ADD_FOLDER;
  folder: IItem;
}
interface SetCloudProvider {
  type: typeof SET_CLOUD_PROVIDER;
  provider: ProviderType;
}

export type DriveActions =
  | SetSelectedItemAction
  | SetDriveStateAction
  | SetDriveContentAction
  | AddDriveFileAction
  | AddDriveFolderAction
  | SetCloudProvider;
