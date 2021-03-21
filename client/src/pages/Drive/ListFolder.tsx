import React from 'react';
import { Button } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { RouteComponentProps } from 'react-router';

import './ListFolder.css';
import ListFolderItems from './ListFolderItems';

interface MatchProps {
  id: string;
}

const ListFolder = ({ match }: RouteComponentProps<MatchProps>) => {
  const { id } = match.params;
  return (
    <div className='flex flex-column items-center'>
      <span>{id}</span>
      <div className='flex'>
        <div className='left'>
          <Button
            variant='contained'
            style={{ textTransform: 'none' }}
            color='primary'
            startIcon={<CreateNewFolderIcon />}
          >
            New Folder
          </Button>
          <Button
            variant='contained'
            style={{ textTransform: 'none' }}
            color='primary'
            startIcon={<CloudUploadIcon />}
          >
            Upload File
          </Button>
        </div>
        <div className='right'>
          <ListFolderItems />
        </div>
      </div>
    </div>
  );
};

export default ListFolder;
