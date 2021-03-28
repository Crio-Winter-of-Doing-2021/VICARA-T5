import React from 'react';
import { IItem } from '../pages/Drive/ListFolderItems';

interface IProps {
  file: IItem;
}

const File = ({ file }: IProps) => {
  return (
    <div className='w4 items-center justify-center flex'>
      <p className='ow'>{file.name}</p>
    </div>
  );
};

export default File;
