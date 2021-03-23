import React from 'react';
import { IItem } from '../pages/Drive/ListFolderItems';

interface IProps {
  file: IItem;
}

const File = ({ file }: IProps) => {
  return (
    <div className='w4 items-center justify-center flex'>
      <span>{file.name}</span>
    </div>
  );
};

export default File;
