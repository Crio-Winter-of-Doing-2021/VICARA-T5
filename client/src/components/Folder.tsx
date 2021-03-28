import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { IItem } from '../pages/Drive/ListFolderItems';
import { setSelectedItem } from '../redux/drive/drive.actions';
import { useDispatch } from 'react-redux';

interface IProps {
  folder: IItem;
}

const Folder = ({ folder }: IProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFolderClick = () => {
    dispatch(setSelectedItem({ type: folder.type, id: folder._id }));
  };

  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        className='w4'
        startIcon={<FolderIcon />}
        onClick={handleFolderClick}
        onDoubleClick={() =>
          //   history.push(history.location.pathname + '/' + folderName)
          history.push(folder._id)
        }
      >
        {folder.name}
      </Button>
    </div>
  );
};

export default Folder;
