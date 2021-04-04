import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CloudDownload as DownloadIcon,
  Pageview as ViewIcon,
} from '@material-ui/icons';
import BootstrapTooltip from '../common/BootstrapTooltip';
import { ApiRoot, DOWNLOAD_FILE } from '../../assets/ts/api';
import Modal from '../common/Modal/Modal';
import ViewFile from '../../pages/Drive/ViewFile';
import { useSelector } from 'react-redux';
import { selectDisplayName } from '../../redux/auth/auth.selectors';

interface IProps {
  id: string;
  type: 'folder' | 'file';
}

const DriveItemMenu = ({ id, type }: IProps) => {
  // console.log({ id, type });
  const [viewFileUrl, setViewFileUrl] = useState('');
  const username = useSelector(selectDisplayName);
  const handleView = () => {
    // const id = 'alpha_file_a047d7ff-54b9-4db2-b002-1920a5687a1b.png';
    // const username = 'alpha';

    fetch(ApiRoot + DOWNLOAD_FILE, {
      method: 'GET',
      credentials: 'include',
      headers: { username, file_id: id },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setViewFileUrl(res);
      })
      .catch((err) => console.log(err));
  };
  const handleDownload = () => {};
  return (
    <div className='self-end'>
      <BootstrapTooltip title='Delete'>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </BootstrapTooltip>
      <BootstrapTooltip title='Edit'>
        <IconButton>
          <EditIcon />
        </IconButton>
      </BootstrapTooltip>
      {type === 'file' && (
        <>
          <BootstrapTooltip title='Download'>
            <IconButton onClick={handleDownload}>
              <DownloadIcon />
            </IconButton>
          </BootstrapTooltip>
          <BootstrapTooltip title='View'>
            <IconButton onClick={handleView}>
              <ViewIcon />
            </IconButton>
          </BootstrapTooltip>
          <Modal
            open={!!viewFileUrl}
            onClose={() => setViewFileUrl('')}
            modalName='view-file-modal'
          >
            <ViewFile url={viewFileUrl} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default DriveItemMenu;
