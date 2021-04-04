import React from 'react';
import { useDispatch } from 'react-redux';
import { IItem } from '../pages/Drive/ListFolderItems';
import { setSelectedItem } from '../redux/drive/drive.actions';
import Card from './common/Card';

interface IProps {
  file: IItem;
}

const File = ({ file }: IProps) => {
  const dispatch = useDispatch();
  const handleFileClick = () => {
    dispatch(setSelectedItem({ type: file.type, id: file.file_id! }));
  };
  return (
    <Card
      className='ow w4 pa3 pointer'
      style={{ height: '150px' }}
      onClick={handleFileClick}
    >
      {file.name}
    </Card>
  );
};

export default File;
