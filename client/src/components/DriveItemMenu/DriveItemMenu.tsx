import { IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import React from 'react';

interface IProps {
  id: string;
  type: 'folder' | 'file';
}

const DriveItemMenu = ({ id, type }: IProps) => {
  return (
    <div className='self-end'>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <IconButton>
        <EditIcon />
      </IconButton>
    </div>
  );
};

export default DriveItemMenu;
