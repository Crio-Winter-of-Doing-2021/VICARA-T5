import React from 'react';
import { useSelector } from 'react-redux';
import { selectDriveState } from '../../redux/drive/drive.selectors';

const Breadcrumb = () => {
  const { absolutePath } = useSelector(selectDriveState);
  return <div>{absolutePath}</div>;
};

export default Breadcrumb;
