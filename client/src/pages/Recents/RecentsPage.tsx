import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApiRoot, RECENTS } from '../../assets/ts/api';
import usePageStyles from '../../assets/tsx/usePageStyle';
import DottedLineLoader from '../../components/common/Loaders/Loader';
import File from '../../components/File';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import { IItem } from '../../redux/drive/drive.types';

const RecentsPage = () => {
  const [files, setFiles] = useState<IItem[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const username = useSelector(selectDisplayName);

  useEffect(() => {
    // const location = window.location as any;
    setLoading(true);
    fetch(ApiRoot + RECENTS, {
      method: 'GET',
      credentials: 'include',
      headers: { username },
    })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        console.log('resJson: ', resJson);
        setFiles(resJson);
      })
      .catch((e) => {
        console.log('Error fetching files: ', e);
        setErrMsg(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  const classes = usePageStyles();

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <div className='flex flex-column'>
        {!loading ? (
          !!files.length ? (
            <div className='flex list-folder-items-container flex-wrap'>
              {files.map((x, i) => (
                <File file={x} key={i} />
              ))}
            </div>
          ) : (
            <div>No files starred</div>
          )
        ) : (
          <DottedLineLoader />
        )}
        {!!errMsg && <div className='red'>{errMsg}</div>}
      </div>
    </div>
  );
};

export default RecentsPage;
