import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../redux/drive/drive.actions';
import { IItem } from '../redux/drive/drive.types';
import Card from './common/Card';

interface IProps {
  file: IItem;
}

const File = ({ file }: IProps) => {
  const dispatch = useDispatch();
  const handleFileClick = () => {
    dispatch(setSelectedItem({ type: file.type, id: file.artefactID }));
  };
  return (
    <Card
      className='ow w4 pa3 pointer'
      style={{ height: '200px' }}
      onClick={handleFileClick}
    >
      {file.name}
    </Card>
  );
};

export default File;
