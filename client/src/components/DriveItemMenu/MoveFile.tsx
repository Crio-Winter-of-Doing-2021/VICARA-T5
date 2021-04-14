import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  ApiRoot,
  ARTEFACT_ID,
  GET_FOLDER_ITEMS,
  ORGANIZE_FILE,
} from '../../assets/ts/api';
import { convertArrayToObj, isObjEmpty } from '../../assets/ts/utilities';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import { IItem, IItemWithId } from '../../redux/drive/drive.types';
import DottedLineLoader from '../common/Loaders/Loader';
import FolderItem from './FolderItem';

interface IProps {
  artefactID: string;
}

const MoveFile = ({ artefactID }: IProps) => {
  const [id, setId] = useState('/root');
  const [absolutePath, setAbsolutePath] = useState('/root');
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState<IItemWithId>({});

  const username = useSelector(selectDisplayName);

  const handleMove = () => {
    // move from artefactID to new absolute path
    const formData = new FormData();
    formData.append('absolutePath', absolutePath);
    formData.append('artefactID', artefactID);
    fetch(ApiRoot + ORGANIZE_FILE, {
      method: 'PUT',
      body: formData,
      headers: { username },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
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
