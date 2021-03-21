import React, { useEffect, useState } from 'react';
import { ApiRoot } from '../../assets/ts/api';
import File from '../../components/File';
import Folder from '../../components/Folder';

const items = [
  {
    name: 'Folder1',
    type: 'folder',
  },
  {
    name: 'Folder2',
    type: 'folder',
  },
  {
    name: 'File1',
    type: 'file',
  },
  {
    name: 'Folder3',
    type: 'folder',
  },
  {
    name: 'Folder4',
    type: 'folder',
  },
  {
    name: 'File2',
    type: 'file',
  },
  {
    name: 'File3',
    type: 'file',
  },
  {
    name: 'File4',
    type: 'file',
  },
];

const ListFolderItems = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);

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
        // res.filter((x) => x.type === 'folder');
        // res.filter((x) => x.type === 'file');
        // setFolderItems(res);
      })
      .catch((err) => console.log('Error fetching files: ', err));
  }, []);
  return (
    <div className='flex list-folder-items-container flex-wrap'>
      {items.map((x, i) =>
        x.type === 'folder' ? (
          <Folder folderName={x.name} key={i} />
        ) : (
          <File name={x.name} key={i} />
        )
      )}
    </div>
  );
};

export default ListFolderItems;
