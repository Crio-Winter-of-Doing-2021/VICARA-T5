import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import { Button } from '@material-ui/core';
import { IItem } from '../../redux/drive/drive.types';

interface IProps {
  folder: IItem;
  handleFolderClick: () => void;
}

const FolderItem = ({ folder, handleFolderClick }: IProps) => {
  const { name } = folder;

  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        className='w5'
        startIcon={<FolderIcon />}
        onClick={handleFolderClick}
      >
        {name}
      </Button>
    </div>
  );
};

export default FolderItem;
