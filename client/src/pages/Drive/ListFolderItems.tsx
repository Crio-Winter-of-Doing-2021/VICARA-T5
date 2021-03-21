import React from 'react';
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
    name: 'Folder2',
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
    name: 'File1',
    type: 'file',
  },
  {
    name: 'File1',
    type: 'file',
  },
  {
    name: 'File1',
    type: 'file',
  },
];

const ListFolderItems = () => {
  // TODO: fetch the items
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
