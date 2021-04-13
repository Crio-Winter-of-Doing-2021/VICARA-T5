import { provider_azure, provider_s3 } from '../../assets/ts/api';
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
  PUSH_ABS_ID_PATH,
  POP_ABS_ID_PATH,
  SET_ABS_ID_PATH,
  CLEAR_ABS_ID_PATH,
} from '../constants';

export type ProviderType = typeof provider_azure | typeof provider_s3;

export interface DriveReducer {
  selected: SelectedItem;
  driveState: DriveState;
  content: DriveContent;
}

export interface IItem {
  _id: { $oid: string };
  artefactID: string;
  name: string;
  created: string;
  accessed: string;
  modified: string;
  type: 'file' | 'folder';
  parentArtefactID: string;
  absolutePath: string;
  cloudProvider: string;
  starred: boolean;
}
export interface IItemWithId {
  [id: string]: IItem;
}

export interface DriveContent {
  files: IItemWithId;
  folders: IItemWithId;
}
const defaultDriveContent: DriveContent = {
  files: {},
  folders: {},
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
  parentArtefactID: string;
  absolutePath: string;
  absIdPath: string;
  cloudProvider: ProviderType;
}
export const defaultDriveState: DriveState = {
  parentArtefactID: '/root',
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
interface ClearSelectedItemAction {
  type: typeof CLEAR_SELECTED_ITEM;
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
  id: string;
  file: IItem;
}
interface AddDriveFolderAction {
  type: typeof ADD_FOLDER;
  id: string;
  folder: IItem;
}
interface SetCloudProvider {
  type: typeof SET_CLOUD_PROVIDER;
  provider: ProviderType;
}

interface EditDriveFileAction {
  type: typeof EDIT_FILE;
  id: string;
  file: Partial<IItem>;
}
interface EditDriveFolderAction {
  type: typeof EDIT_FOLDER;
  id: string;
  folder: Partial<IItem>;
}
interface DeleteDriveFileAction {
  type: typeof DELETE_FILE;
  id: string;
}
interface DeleteDriveFolderAction {
  type: typeof DELETE_FOLDER;
  id: string;
}

interface PushAbsIdPathAction {
  type: typeof PUSH_ABS_ID_PATH;
  id: string;
}
interface PopAbsIdPathAction {
  type: typeof POP_ABS_ID_PATH;
}
interface SetAbsIdPathAction {
  type: typeof SET_ABS_ID_PATH;
  path: string;
}
interface ClearAbsIdPathAction {
  type: typeof CLEAR_ABS_ID_PATH;
}

export type DriveActions =
  | SetSelectedItemAction
  | ClearSelectedItemAction
  | SetDriveStateAction
  | SetDriveContentAction
  | AddDriveFileAction
  | AddDriveFolderAction
  | SetCloudProvider
  | EditDriveFileAction
  | EditDriveFolderAction
  | DeleteDriveFileAction
  | DeleteDriveFolderAction
  | PushAbsIdPathAction
  | PopAbsIdPathAction
  | SetAbsIdPathAction
  | ClearAbsIdPathAction;
