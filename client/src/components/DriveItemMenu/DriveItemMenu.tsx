import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CloudDownload as DownloadIcon,
} from '@material-ui/icons';

interface IProps {
  id: string;
  type: 'folder' | 'file';
}

const DriveItemMenu = ({ id, type }: IProps) => {
  const handleDownloadClick = () => {};
  return (
    <div className='self-end'>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDownloadClick}>
        <DownloadIcon />
      </IconButton>
    </div>
  );
};

export default DriveItemMenu;
