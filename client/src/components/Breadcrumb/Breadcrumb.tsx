// import { IconButton } from '@material-ui/core';
// import { ArrowBack } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectDriveState } from '../../redux/drive/drive.selectors';

const Breadcrumb = () => {
  const { absolutePath } = useSelector(selectDriveState);
  return (
    <div>
      {/* <IconButton>
        <ArrowBack />
      </IconButton> */}
      <div>{absolutePath}</div>
    </div>
  );
};

export default Breadcrumb;
