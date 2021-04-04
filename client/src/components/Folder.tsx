import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { IItem } from '../pages/Drive/ListFolderItems';
import { setDriveState, setSelectedItem } from '../redux/drive/drive.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectDriveState } from '../redux/drive/drive.selectors';
import { DriveState } from '../redux/drive/drive.types';

interface IProps {
  folder: IItem;
}

const Folder = ({ folder }: IProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { type, folder_id = '', name } = folder;

  const { absolutePath } = useSelector(selectDriveState);

  const handleFolderClick = () => {
    // console.log('Clicked: ', folder._id);
    dispatch(setSelectedItem({ type, id: folder_id }));
  };

  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        className='w4'
        startIcon={<FolderIcon />}
        onClick={handleFolderClick}
        onDoubleClick={() => {
          history.push({ pathname: '/folders/' + folder_id });
          // console.log(absolutePath);
          const newDriveState: DriveState = {
            absolutePath: absolutePath + '/' + name,
            currentDir: name,
            content: {
              files: [],
              folders: [],
            },
          };
          dispatch(setDriveState(newDriveState));
          // saveDriveStateToStorage(newDriveState);
        }}
      >
        {name}
      </Button>
    </div>
  );
};

export default Folder;
