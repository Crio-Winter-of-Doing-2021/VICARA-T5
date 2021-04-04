import React from 'react';
import { IItem } from '../pages/Drive/ListFolderItems';
import Card from './common/Card';

interface IProps {
  file: IItem;
}

const File = ({ file }: IProps) => {
  return (
    <Card className='ow w4 pa3' style={{ height: '150px' }}>
      {file.name}
    </Card>
  );
};

export default File;
