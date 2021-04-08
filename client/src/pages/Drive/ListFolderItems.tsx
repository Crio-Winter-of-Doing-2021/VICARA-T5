import React, { useEffect, useState } from 'react';
// import { ClickAwayListener } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ABSOLUTE_PATH, ApiRoot, GET_FOLDER_ITEMS } from '../../assets/ts/api';
import DottedLineLoader from '../../components/common/Loaders/Loader';
import File from '../../components/File';
import Folder from '../../components/Folder';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import {
  setDriveContent,
  // setSelectedItem,
} from '../../redux/drive/drive.actions';
import {
  selectDriveContent,
  selectDriveState,
} from '../../redux/drive/drive.selectors';
// import { defaultSelectedItem } from '../../redux/drive/drive.types';

export interface IItem {
  _id: { $oid: string };
  name: string;
  created: string;
  file_id?: string;
  folder_id?: string;
  accessed: string;
  modified: string;
  type: 'file' | 'folder';
  parentDir: string;
  absolutePath: string;
  cloudProvider?: string;
}

const ListFolderItems = ({ id }: { id: string }) => {
  // const [files, setFiles] = useState<IItem[]>([]);
  // const [folders, setFolders] = useState<IItem[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const username = useSelector(selectDisplayName);
  const { absolutePath } = useSelector(selectDriveState);
  const { files, folders } = useSelector(selectDriveContent);
  // console.log({ files, folders });
  const dispatch = useDispatch();

  // const handleClickAway = () => {
  //   dispatch(setSelectedItem(defaultSelectedItem));
  // };

  useEffect(() => {
    // const location = window.location as any;
    setLoading(true);
    let formData = new FormData();
    formData.append(ABSOLUTE_PATH, absolutePath);

    fetch(ApiRoot + GET_FOLDER_ITEMS, {
      body: formData,
      method: 'POST',
      credentials: 'include',
      headers: {
        username,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.status === 400) setErr(true);
        return res.json();
      })
      .then((resJson) => {
        // console.log('resJson: ', resJson);
        if (err) {
          setErrMsg(resJson);
          return;
        }
        const dirs = resJson.filter((x: IItem) => x.type === 'folder');
        const fls = resJson.filter((x: IItem) => x.type === 'file');
        // console.log({ dirs, fls });
        // setFolders(dirs);
        // setFiles(fls);
        dispatch(
          setDriveContent({
            files: fls,
            folders: dirs,
          })
        );
      })
      .catch((e) => console.log('Error fetching files: ', e))
      .finally(() => {
        setLoading(false);
      });
  }, [id, username, absolutePath, err, dispatch]);
  return (
    // <ClickAwayListener onClickAway={handleClickAway}>
    <div className='flex flex-column'>
      {!loading ? (
        !!folders.length || !!files.length ? (
          <>
            <div className='flex list-folder-items-container flex-wrap'>
              {!!folders.length &&
                folders.map((x, i) => <Folder folder={x} key={i} />)}
            </div>
            <div className='flex list-folder-items-container flex-wrap'>
              {!!files.length && files.map((x, i) => <File file={x} key={i} />)}
            </div>
          </>
        ) : (
          <div>No files or directories found. </div>
        )
      ) : (
        <DottedLineLoader />
      )}
      {err && <div className='red'>{errMsg}</div>}
    </div>
    // </ClickAwayListener>
  );
};

export default ListFolderItems;
