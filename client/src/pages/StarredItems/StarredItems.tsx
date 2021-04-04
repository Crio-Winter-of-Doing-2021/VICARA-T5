import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApiRoot, DOWNLOAD_FILE } from '../../assets/ts/api';
import DottedLineLoader from '../../components/common/Loaders/Loader';
import File from '../../components/File';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import { IItem } from '../Drive/ListFolderItems';

const StarredItems = () => {
  const [files, setFiles] = useState<IItem[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const username = useSelector(selectDisplayName);

  useEffect(() => {
    // const location = window.location as any;
    setLoading(true);
    let formData = new FormData();
    fetch(ApiRoot + DOWNLOAD_FILE, {
      body: formData,
      method: 'POST',
      credentials: 'include',
      headers: {
        username,
      },
    })
      .then((res) => {
        // console.log(res);
        // if (res.status === 400) setErr(true);
        return res.json();
      })
      .then((resJson) => {
        // console.log('resJson: ', resJson);
        // if (err) {
        //   setErrMsg(resJson);
        //   return;
        // }
        setFiles(resJson);
      })
      .catch((e) => console.log('Error fetching files: ', e))
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return (
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
  );
};

export default StarredItems;
