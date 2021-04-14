import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { setDriveState, setSelectedItem } from '../redux/drive/drive.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectDriveState } from '../redux/drive/drive.selectors';
import { DriveState, IItem } from '../redux/drive/drive.types';

interface IProps {
  folder: IItem;
}

const Folder = ({ folder }: IProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { type, artefactID, name } = folder;
  // console.log(artefactID);

  const { absolutePath, absIdPath, cloudProvider } = useSelector(
    selectDriveState
  );

  const handleFolderClick = () => {
    dispatch(setSelectedItem({ type, id: artefactID }));
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
          const parentArtefactID = artefactID === 'root' ? '/root' : artefactID;
          history.push({ pathname: '/folders/' + parentArtefactID });
          // console.log(absolutePath);
          const newDriveState: DriveState = {
            cloudProvider,
            absolutePath: absolutePath + '/' + name,
            parentArtefactID,
            absIdPath: absIdPath + '/' + artefactID,
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
