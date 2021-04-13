import React from 'react';
import { NavigateNext } from '@material-ui/icons';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectAbsPathList,
  selectAbsPathIdList,
} from '../../redux/drive/drive.selectors';
import BootstrapTooltip from '../common/BootstrapTooltip';
import { NavLink } from 'react-router-dom';
import { FOLDERS } from '../../routes/routes';
import { setDriveState } from '../../redux/drive/drive.actions';

const Breadcrumb = () => {
  const { pathList, pathIdList } = useSelector(
    createStructuredSelector({
      pathList: selectAbsPathList,
      pathIdList: selectAbsPathIdList,
    })
  );

  const dispatch = useDispatch();

  const handleClick = (i: number) => {
    const newAbsPath = '/' + pathList.slice(0, i + 1).join('/');
    const z = pathIdList.slice(0, i + 1);
    const newAbsIdPath = '/' + z.join('/');
    const parentArtefactID = z[z.length - 1];
    dispatch(
      setDriveState({
        absolutePath: newAbsPath,
        absIdPath: newAbsIdPath,
        parentArtefactID,
      })
    );
  };
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNext fontSize='small' />}
        aria-label='breadcrumb'
      >
        {pathList.map((x, i: number) =>
          i !== pathList.length - 1 ? (
            <BootstrapTooltip title={pathIdList[i]}>
              <NavLink
                to={
                  pathIdList[i] === 'root'
                    ? FOLDERS
                    : FOLDERS + '/' + pathIdList[i]
                }
                className='nav-style'
              >
                <div
                  key={i}
                  className='pointer'
                  // color='inherit'
                  // href={pathIdList[i]}
                  onClick={() => handleClick(i)}
                >
                  {x}
                </div>
              </NavLink>
            </BootstrapTooltip>
          ) : (
            <Typography key={i} style={{ color: 'black' }}>
              {x}
            </Typography>
          )
        )}
        {/* <Link color='inherit' href='/' onClick={handleClick}>
          Material-UI
        </Link>
        <Link
          color='inherit'
          href='/getting-started/installation/'
          onClick={handleClick}
        >
          Core
        </Link>
        <Typography color='textPrimary'>Breadcrumb</Typography> */}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
