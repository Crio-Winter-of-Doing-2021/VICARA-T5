import React, { useEffect, useState } from 'react';
// import { ClickAwayListener } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ApiRoot, ARTEFACT_ID, GET_FOLDER_ITEMS } from '../../assets/ts/api';
import { convertArrayToObj, isObjEmpty } from '../../assets/ts/utilities';
import DottedLineLoader from '../../components/common/Loaders/Loader';
import File from '../../components/File';
import Folder from '../../components/Folder';
import { selectDisplayName } from '../../redux/auth/auth.selectors';
import { setDriveContent } from '../../redux/drive/drive.actions';
import { selectDriveContent } from '../../redux/drive/drive.selectors';
import { IItem, IItemWithId } from '../../redux/drive/drive.types';

const ListFolderItems = ({ id }: { id: string }) => {
  const [errMsg, setErrMsg] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const username = useSelector(selectDisplayName);
  const { files, folders } = useSelector(selectDriveContent);
  const dispatch = useDispatch();

  // const handleClickAway = () => {
  //   dispatch(clearSelectedItem());
  // };

  useEffect(() => {
    // const location = window.location as any;
    setLoading(true);
    let formData = new FormData();
    formData.append(ARTEFACT_ID, id);

    fetch(ApiRoot + GET_FOLDER_ITEMS, {
      body: formData,
      method: 'POST',
      credentials: 'include',
      headers: {
        username,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.status === 400) setErr(true);
        return res.json();
      })
      .then((resJson) => {
        // console.log('resJson: ', resJson);
        if (err) {
          setErrMsg(resJson);
          return;
        }
        const res = resJson as IItem[];
        const dirs = convertArrayToObj<IItem, IItemWithId>(
          res.filter((x: IItem) => x.type === 'folder'),
          'artefactID'
        );
        const fls = convertArrayToObj<IItem, IItemWithId>(
          res.filter((x: IItem) => x.type === 'file'),
          'artefactID'
        );
        // console.log({ dirs, fls });
        // setFolders(dirs);
        // setFiles(fls);
        dispatch(
          setDriveContent({
            files: fls,
            folders: dirs,
          })
        );
      })
      .catch((e) => console.log('Error fetching files: ', e))
      .finally(() => {
        setLoading(false);
      });
  }, [id, username, err, dispatch]);
  return (
    // <ClickAwayListener onClickAway={handleClickAway}>
    <div className='flex flex-column'>
      {!loading ? (
        !isObjEmpty(folders) || !isObjEmpty(files) ? (
          <>
            <div className='flex list-folder-items-container flex-wrap'>
              {!isObjEmpty(folders) &&
                Object.values(folders).map((x, i) => (
                  <Folder folder={x} key={i} />
                ))}
            </div>
            <div className='flex list-folder-items-container flex-wrap'>
              {!isObjEmpty(files) &&
                Object.values(files).map((x, i) => <File file={x} key={i} />)}
            </div>
          </>
        ) : (
          <div>No files or directories found. </div>
        )
      ) : (
        <DottedLineLoader />
      )}
      {err && <div className='red'>{errMsg}</div>}
    </div>
    // </ClickAwayListener>
  );
};

export default ListFolderItems;
