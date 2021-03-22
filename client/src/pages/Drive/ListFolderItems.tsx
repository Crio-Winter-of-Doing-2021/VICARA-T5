import React, { useEffect, useState } from 'react';
import { ApiRoot } from '../../assets/ts/api';
import File from '../../components/File';
import Folder from '../../components/Folder';

interface IItem {
  _id: string;
  name: string;
  created: string;
  accessed: string;
  modified: string;
  type: 'file' | 'folder';
  parentDir: string;
  absolutePath: string;
}

const ListFolderItems = () => {
  const [files, setFiles] = useState<IItem[]>([]);
  const [folders, setFolders] = useState<IItem[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => {
    let formData = new FormData();
    // formData.append('absolutePath', '/root');
    fetch(ApiRoot + '/getFolderItems', {
      body: formData,
      method: 'POST',
      credentials: 'include',
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
  }, []);
  return (
    <div className='flex list-folder-items-container flex-wrap'>
      {folders.map((x, i) => (
        <Folder folderName={x.name} key={i} />
      ))}
      {files.map((x, i) => (
        <File name={x.name} key={i} />
      ))}
      {err && <div className='red'>{errMsg}</div>}
    </div>
  );
};

export default ListFolderItems;
