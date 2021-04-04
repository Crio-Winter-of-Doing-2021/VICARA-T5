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

  const { absolutePath } = useSelector(selectDriveState);

  const handleFolderClick = () => {
    // console.log('Clicked: ', folder._id);
    dispatch(setSelectedItem({ type: folder.type, id: folder._id.$oid }));
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
          history.push({ pathname: '/folders/' + folder._id['$oid'] });
          // console.log(absolutePath);
          const newDriveState: DriveState = {
            absolutePath: absolutePath + '/' + folder.name,
            currentDir: folder.name,
          };
          dispatch(setDriveState(newDriveState));
          // saveDriveStateToStorage(newDriveState);
        }}
      >
        {folder.name}
      </Button>
    </div>
  );
};

export default Folder;
