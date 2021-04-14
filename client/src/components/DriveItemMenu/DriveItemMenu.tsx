import React, { useState, useEffect } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CloudDownload as DownloadIcon,
  Pageview as ViewIcon,
  FolderOpen as MoveIcon,
} from '@material-ui/icons';
import BootstrapTooltip from '../common/BootstrapTooltip';
import {
  ApiRoot,
  DELETE_FILE_FOLDER,
  DOWNLOAD_FILE,
  RENAME_FILE_FOLDER,
  VIEW_FILE,
} from '../../assets/ts/api';
import Modal from '../common/Modal/Modal';
import ViewFile from '../../pages/Drive/ViewFile';
import { useDispatch, useSelector } from 'react-redux';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import downloadFile from '../../assets/ts/downloadFile';
import {
  clearSelectedItem,
  deleteFile,
  deleteFolder,
  editFile,
  editFolder,
} from '../../redux/drive/drive.actions';
import { handleKeyPress } from '../../assets/ts/utilities';
import { IItem } from '../../redux/drive/drive.types';
import { selectSelectedItemName } from '../../redux/drive/drive.selectors';
import CustomMenu from '../common/Menu/CustomMenu';
import MoveFile from './MoveFile';

interface IProps {
  id: string;
  type: 'folder' | 'file';
}

const DriveItemMenu = ({ id, type }: IProps) => {
  // console.log({ id, type });
  const [viewFileUrl, setViewFileUrl] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const username = useSelector(selectDisplayName);
  const name = useSelector((state) => selectSelectedItemName(id)(state));
  const dispatch = useDispatch();

  const [newName, setNewName] = useState('');
  useEffect(() => {
    setNewName(name);
  }, [name]);

  const handleView = () => {
    fetch(ApiRoot + VIEW_FILE, {
      method: 'GET',
      credentials: 'include',
      headers: { username, artefactID: id },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setViewFileUrl(res);
      })
      .catch((err) => console.log(err));
  };
  const handleDownload = () => {
    fetch(ApiRoot + DOWNLOAD_FILE, {
      method: 'GET',
      credentials: 'include',
      headers: { username, artefactID: id },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        downloadFile(res);
      })
      .catch((err) => console.log(err));
  };

  const onEditClick = () => {
    const formData = new FormData();
    formData.append('artefactID', id);
    formData.append('newName', newName);
    fetch(ApiRoot + RENAME_FILE_FOLDER, {
      method: 'PUT',
      body: formData,
      headers: { username },
    })
      .then((res) => {
        setEditOpen(false);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (type === 'folder') dispatch(editFolder(id, { name: newName }));
        else dispatch(editFile(id, { name: newName }));
      })
      .catch((e) => console.log('Error: ', e))
      .finally(() => {
        setNewName('');
      });
  };

  const onDeleteClick = () => {
    const formData = new FormData();
    formData.append('artefactID', id);
    fetch(ApiRoot + DELETE_FILE_FOLDER, {
      method: 'DELETE',
      body: formData,
      headers: { username },
    })
      .then((res) => {
        return res.json();
      })
      .then((res: IItem) => {
        console.log(res);
        dispatch(clearSelectedItem());
        if (type === 'file') dispatch(deleteFile(id));
        else dispatch(deleteFolder(id));
      })
      .catch((e) => console.log('Error: ', e));
  };

  const handleMoveClick = () => {};

  return (
    <div
      className='flex justify-end'
      style={{ position: 'fixed', marginBottom: '25px', right: 0 }}
    >
      <BootstrapTooltip title='Delete'>
        <IconButton onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </BootstrapTooltip>
      <BootstrapTooltip title='Rename'>
        <IconButton onClick={() => setEditOpen(true)}>
          <EditIcon />
        </IconButton>
      </BootstrapTooltip>
      {type === 'file' && (
        <>
          <BootstrapTooltip title='Download'>
            <IconButton onClick={handleDownload}>
              <DownloadIcon />
            </IconButton>
          </BootstrapTooltip>
          <BootstrapTooltip title='View'>
            <IconButton onClick={handleView}>
              <ViewIcon />
            </IconButton>
          </BootstrapTooltip>
          <CustomMenu
            buttonTooltipText='Move to'
            menuName='organize-files'
            buttonContent={<MoveIcon />}
            onClick={handleMoveClick}
          >
            <MoveFile artefactID={id} />
          </CustomMenu>
          <Modal
            open={!!viewFileUrl}
            onClose={() => setViewFileUrl('')}
            modalName='view-file-modal'
            largeModal
          >
            <ViewFile url={viewFileUrl} />
          </Modal>
        </>
      )}
      <Modal
        open={editOpen}
        smallModal
        onClose={() => setEditOpen(false)}
        modalName='edit-file-folder'
        dialogTitle={`Edit ${type}`}
        dialogActions={[
          {
            onBtnClick: () => setEditOpen(false),
            btnText: 'Cancel',
            btnStyle: { variant: 'outlined', color: 'primary' },
          },
          {
            onBtnClick: onEditClick,
            btnText: 'Save',
            btnStyle: { variant: 'contained', color: 'primary' },
          },
        ]}
      >
        <TextField
          id='file-folder-name'
          label='Name'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
            handleKeyPress(e, onEditClick)
          }
        />
      </Modal>
    </div>
  );
};

export default DriveItemMenu;
