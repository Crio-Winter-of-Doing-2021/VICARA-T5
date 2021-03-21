import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

interface IProps {
  folderName: string;
}

const Folder = ({ folderName }: IProps) => {
  const history = useHistory();
  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        className='w4'
        startIcon={<FolderIcon />}
        onDoubleClick={() =>
          //   history.push(history.location.pathname + '/' + folderName)
          history.push(folderName)
        }
      >
        {folderName}
      </Button>
    </div>
  );
};

export default Folder;
