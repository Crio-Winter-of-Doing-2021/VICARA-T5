import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { RouteComponentProps } from 'react-router';

import './ListFolder.css';
import ListFolderItems from './ListFolderItems';
import { ApiRoot } from '../../assets/ts/api';
import DriveItemMenu from '../../components/DriveItemMenu/DriveItemMenu';
import { useSelector } from 'react-redux';
import { selectSelectedItem } from '../../redux/drive/drive.selectors';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import Modal from '../../components/common/Modal/Modal';
import { TextField } from '@material-ui/core';
import { handleKeyPress } from '../../assets/ts/utilities';
import { loadDriveStateFromStorage } from '../../redux/drive/drive.actions';

interface MatchProps {
  id: string;
}

const ListFolder = ({ match }: RouteComponentProps<MatchProps>) => {
  const { id } = match.params; // folder id
  const [open, setOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const selectedItem = useSelector(selectSelectedItem);

  const username = useSelector(selectDisplayName);

  // const changeHandler = (event: any) => {

  //   // setIsSelected(true);
  //   uploadFile();
  // };

  const uploadFile = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) {
      console.log('No file selected');
      return;
    }

    // const location = window.location as any;
    const formData = new FormData();
    const { absolutePath, currentDir } = loadDriveStateFromStorage();
    console.log(absolutePath);
    formData.append('file', file);
    formData.append(
      'absolutePath',
      absolutePath
      // location.hasOwnProperty('state')
      //   ? location.state['absolutePath'] || '/root'
      //   : '/root'
    );
    formData.append('currentDir', currentDir);

    const options = {
      method: 'POST',
      body: formData,
      headers: { username },
    };
    delete (options.headers as any)['Content-Type'];

    fetch(ApiRoot + '/upload', options)
      .then(() => {
        // setSubmitSuccess(true);
      })
      .catch((err) => console.log(err));
    // .finally(() => setSubmitting(false));
  };

  const onAddClick = () => {
    const formData = new FormData();
    const { absolutePath, currentDir } = loadDriveStateFromStorage();
    formData.append('currentDir', currentDir);
    formData.append('absolutePath', absolutePath);
    formData.append('folderName', newFolderName);
    fetch(ApiRoot + '/addFolder', {
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
        <div className='left'>
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
          {/* <Button
            variant='contained'
            color='secondary'
            startIcon={<CloudUploadIcon />}
          >
            Upload File
          </Button> */}
          <input type='file' name='file' onChange={uploadFile} />
        </div>
        <div className='right'>
          <ListFolderItems id={id} />
        </div>
      </div>
    </div>
  );
};

export default ListFolder;
