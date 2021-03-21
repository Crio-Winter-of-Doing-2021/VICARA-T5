import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { RouteComponentProps } from 'react-router';

import './ListFolder.css';
import ListFolderItems from './ListFolderItems';
import { ApiRoot } from '../../assets/ts/api';

interface MatchProps {
  id: string;
}

const ListFolder = ({ match }: RouteComponentProps<MatchProps>) => {
  const { id } = match.params;
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
    // setIsSelected(true);
  };

  const uploadFile = () => {
    fetch(ApiRoot + '/upload', {
      method: 'POST',
      // headers: {
      //   'Content-type': 'application/json',
      // },
      // body: JSON.stringify(state),
    })
      .then(() => {
        // setSubmitSuccess(true);
      })
      .catch((err) => console.log(err));
    // .finally(() => setSubmitting(false));
  };

  return (
    <div className='flex flex-column items-center'>
      <span>{id}</span>
      <div className='flex'>
        <div className='left'>
          <Button
            variant='contained'
            color='primary'
            startIcon={<CreateNewFolderIcon />}
          >
            New Folder
          </Button>
          {/* <Button
            variant='contained'
            color='secondary'
            startIcon={<CloudUploadIcon />}
          >
            Upload File
          </Button> */}
          <input type='file' name='file' onChange={changeHandler} />
        </div>
        <div className='right'>
          <ListFolderItems />
        </div>
      </div>
    </div>
  );
};

export default ListFolder;
