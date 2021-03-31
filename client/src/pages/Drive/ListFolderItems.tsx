import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ABSOLUTE_PATH, ApiRoot, GET_FOLDER_ITEMS } from '../../assets/ts/api';
import File from '../../components/File';
import Folder from '../../components/Folder';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import { loadDriveStateFromStorage } from '../../redux/drive/drive.actions';

export interface IItem {
  _id: { $oid: string };
  name: string;
  created: string;
  accessed: string;
  modified: string;
  type: 'file' | 'folder';
  parentDir: string;
  absolutePath: string;
}

const ListFolderItems = ({ id }: { id: string }) => {
  const [files, setFiles] = useState<IItem[]>([]);
  const [folders, setFolders] = useState<IItem[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const [err, setErr] = useState(false);
  const username = useSelector(selectDisplayName);

  useEffect(() => {
    // const location = window.location as any;
    let formData = new FormData();
    formData.append(ABSOLUTE_PATH, loadDriveStateFromStorage().absolutePath);
    fetch(ApiRoot + GET_FOLDER_ITEMS, {
      body: formData,
      method: 'POST',
      credentials: 'include',
      headers: {
        username,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 400) setErr(true);
        return res.json();
      })
      .then((resJson) => {
        console.log('resJson: ', resJson);
        if (err) {
          setErrMsg(resJson);
          return;
        }
        const dirs = resJson.filter((x: IItem) => x.type === 'folder');
        const fls = resJson.filter((x: IItem) => x.type === 'file');
        setFolders(dirs);
        setFiles(fls);
      })
      .catch((e) => console.log('Error fetching files: ', e));
  }, [id, username]);
  return (
    <div className='flex flex-column'>
      <div className='flex list-folder-items-container flex-wrap'>
        {folders.map((x, i) => (
          <Folder folder={x} key={i} />
        ))}
      </div>
      <div className='flex list-folder-items-container flex-wrap'>
        {files.map((x, i) => (
          <File file={x} key={i} />
        ))}
      </div>
      {err && <div className='red'>{errMsg}</div>}
    </div>
  );
};

export default ListFolderItems;
