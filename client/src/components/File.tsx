import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@material-ui/lab/Rating';

import { editFile, setSelectedItem } from '../redux/drive/drive.actions';
import { IItem } from '../redux/drive/drive.types';
import Card from './common/Card';
import { ApiRoot, STAR_FILE } from '../assets/ts/api';
import { selectDisplayName } from '../redux/auth/auth.selectors';

interface IProps {
  file: IItem;
}

const File = ({ file }: IProps) => {
  const dispatch = useDispatch();
  const handleFileClick = () => {
    dispatch(setSelectedItem({ type: file.type, id: file.artefactID }));
  };
  const [starred, setStarred] = React.useState<boolean>(false);
  const username = useSelector(selectDisplayName);

  useEffect(() => {
    setStarred(file.starred);
  }, [file.starred]);

  const handleStarChange = () => {
    const formData = new FormData();
    const id = file.artefactID;
    formData.append('artefactID', id);
    formData.append('starred', String(starred));
    fetch(ApiRoot + STAR_FILE, {
      method: 'PUT',
      body: formData,
      headers: { username },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        dispatch(editFile(id, { starred }));
      })
      .catch((e) => console.log('Error: ', e));
  };

  return (
    <Card className='ow w4 pa3 pointer' style={{ height: '200px' }}>
      <div onClick={handleFileClick}>{file.name}</div>
      <Box
        component='fieldset'
        borderColor='transparent'
        style={{
          display: 'flex',
          alignSelf: 'flex-end',
          padding: 0,
          marginTop: '24px',
        }}
      >
        <Rating
          max={1}
          name='simple-controlled'
          value={Number(starred)}
          onChange={(e, newValue) => {
            setStarred(!!newValue);
            handleStarChange();
          }}
        />
      </Box>
    </Card>
  );
};

export default File;
