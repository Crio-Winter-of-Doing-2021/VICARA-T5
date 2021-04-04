import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { RouteComponentProps } from 'react-router';

import './ListFolder.css';
import ListFolderItems from './ListFolderItems';
import {
  ABSOLUTE_PATH,
  ADD_FOLDER,
  ApiRoot,
  CURRENT_DIR,
  UPLOAD,
} from '../../assets/ts/api';
import DriveItemMenu from '../../components/DriveItemMenu/DriveItemMenu';
import { useSelector } from 'react-redux';
import {
  selectDriveState,
  selectSelectedItem,
} from '../../redux/drive/drive.selectors';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import Modal from '../../components/common/Modal/Modal';
import { TextField } from '@material-ui/core';
import { handleKeyPress } from '../../assets/ts/utilities';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

interface MatchProps {
  id?: string;
}

const ListFolder = ({ match }: RouteComponentProps<MatchProps>) => {
  const { id } = match.params; // folder id
  const [open, setOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const selectedItem = useSelector(selectSelectedItem);
  const username = useSelector(selectDisplayName);
  const { absolutePath, currentDir } = useSelector(selectDriveState);

  // const changeHandler = (event: any) => {

  //   // setIsSelected(true);
  //   uploadFile();
  // };

  console.log('id: ', id);

  const uploadFile = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) {
      console.log('No file selected');
      return;
    }

    // const location = window.location as any;
    const formData = new FormData();
    console.log(absolutePath);
    formData.append('file', file);
    formData.append(
      ABSOLUTE_PATH,
      absolutePath
      // location.hasOwnProperty('state')
      //   ? location.state[ABSOLUTE_PATH] || '/root'
      //   : '/root'
    );
    formData.append(CURRENT_DIR, currentDir);

    const options = {
      method: 'POST',
      body: formData,
      headers: { username },
    };
    delete (options.headers as any)['Content-Type'];

    fetch(ApiRoot + UPLOAD, options)
      .then(() => {
        // setSubmitSuccess(true);
      })
      .catch((err) => console.log(err));
    // .finally(() => setSubmitting(false));
  };

  const onAddClick = () => {
    const formData = new FormData();
    formData.append(CURRENT_DIR, currentDir);
    formData.append(ABSOLUTE_PATH, absolutePath);
    formData.append('folderName', newFolderName);
    fetch(ApiRoot + ADD_FOLDER, {
      method: 'POST',
      body: formData,
      headers: { username },
    })
      .then(() => setOpen(false))
      .catch((e) => console.log('Error: ', e));
  };

  return (
    <div className='flex flex-column items-center'>
      {/* <span>{id}</span> */}
      {selectedItem.id && selectedItem.type && (
        <DriveItemMenu id={selectedItem.id} type={selectedItem.type} />
      )}
      <div className='flex'>
        <div className='left items-center'>
          <Button
            variant='contained'
            color='primary'
            startIcon={<CreateNewFolderIcon />}
            onClick={() => setOpen(true)}
          >
            New Folder
          </Button>
          <Modal
            open={open}
            smallModal
            onClose={() => setOpen(false)}
            modalName='add-folder'
            dialogTitle='Create Folder'
            dialogActions={[
              {
                onBtnClick: onAddClick,
                btnText: 'Create',
                btnStyle: { variant: 'contained', color: 'primary' },
              },
              {
                onBtnClick: () => setOpen(false),
                btnText: 'Cancel',
                btnStyle: { variant: 'outlined', color: 'primary' },
              },
            ]}
          >
            <TextField
              id='new-folder-name'
              label='Folder Name'
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                handleKeyPress(e, onAddClick)
              }
            />
          </Modal>

          <Button
            variant='contained'
            color='secondary'
            startIcon={<CloudUploadIcon />}
            component='label'
          >
            Upload File
            <input
              id='file-input'
              type='file'
              name='file'
              onChange={uploadFile}
              className='dn'
            />
          </Button>
        </div>
        <div className='right'>
          <Breadcrumb />
          <ListFolderItems id={id || '/root'} />
        </div>
      </div>
    </div>
  );
};

export default ListFolder;
