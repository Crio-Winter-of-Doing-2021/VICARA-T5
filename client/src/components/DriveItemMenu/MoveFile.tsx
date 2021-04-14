import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  ABSOLUTE_PATH,
  ApiRoot,
  ARTEFACT_ID,
  GET_FOLDER_ITEMS,
  ORGANIZE_FILE,
  PARENT_ARTEFACT_ID,
} from '../../assets/ts/api';
import { convertArrayToObj, isObjEmpty } from '../../assets/ts/utilities';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import { IItem, IItemWithId } from '../../redux/drive/drive.types';
import { selectGetParentArtefactIdOfFile } from '../../redux/drive/drive.selectors';
import DottedLineLoader from '../common/Loaders/Loader';
import FolderItem from './FolderItem';
import { deleteFile } from '../../redux/drive/drive.actions';

interface IProps {
  artefactID: string;
}

const MoveFile = ({ artefactID }: IProps) => {
  const [id, setId] = useState('/root'); // parentArtefactID
  const [absolutePath, setAbsolutePath] = useState('/root');
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState<IItemWithId>({});

  const username = useSelector(selectDisplayName);
  const prevParentArtefactId = useSelector((state: any) =>
    selectGetParentArtefactIdOfFile(artefactID)(state)
  );

  const dispatch = useDispatch();

  const handleMove = () => {
    // move from artefactID to new absolute path
    const formData = new FormData();
    formData.append(ABSOLUTE_PATH, absolutePath);
    formData.append(ARTEFACT_ID, artefactID); // the id of the file
    formData.append(PARENT_ARTEFACT_ID, id);
    fetch(ApiRoot + ORGANIZE_FILE, {
      method: 'PUT',
      body: formData,
      headers: { username },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (prevParentArtefactId !== id) {
          dispatch(deleteFile(artefactID));
        }
      })
      .catch((e) => console.log('Error moving: ', e));
  };

  useEffect(() => {
    // const location = window.location as any;
    setLoading(true);
    let formData = new FormData();
    formData.append(ARTEFACT_ID, id);

    fetch(ApiRoot + GET_FOLDER_ITEMS, {
      body: formData,
      method: 'POST',
      credentials: 'include',
      headers: { username },
    })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        const res = resJson as IItem[];
        const dirs = convertArrayToObj<IItem, IItemWithId>(
          res.filter((x: IItem) => x.type === 'folder'),
          'artefactID'
        );
        setFolders(dirs);
      })
      .catch((e) => console.log('Error fetching files: ', e))
      .finally(() => {
        setLoading(false);
      });
  }, [id, username]);

  const handleFolderClick = (id: string, name: string) => {
    setId(id);
    setAbsolutePath((absolutePath) => absolutePath + '/' + name);
  };

  return (
    // <ClickAwayListener onClickAway={handleClickAway}>
    <div className='flex flex-column'>
      {!loading ? (
        !isObjEmpty(folders) ? (
          <div className='flex list-folder-items-container flex-wrap'>
            {!isObjEmpty(folders) &&
              Object.values(folders).map((x, i) => (
                <FolderItem
                  folder={x}
                  key={i}
                  handleFolderClick={() =>
                    handleFolderClick(x.artefactID, x.name)
                  }
                />
              ))}
          </div>
        ) : (
          <div>No files or directories found. </div>
        )
      ) : (
        <DottedLineLoader />
      )}
      <Button
        color='primary'
        variant='contained'
        onClick={handleMove}
        style={{ width: 'fit-content', margin: 'auto' }}
      >
        Move here
      </Button>
    </div>
    // </ClickAwayListener>
  );
};

export default MoveFile;
