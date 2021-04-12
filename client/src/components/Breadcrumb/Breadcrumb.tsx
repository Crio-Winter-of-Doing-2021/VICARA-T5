import React from 'react';
import { NavigateNext } from '@material-ui/icons';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectAbsPathList,
  selectAbsPathIdList,
} from '../../redux/drive/drive.selectors';

const Breadcrumb = () => {
  const { pathList, pathIdList } = useSelector(
    createStructuredSelector({
      pathList: selectAbsPathList,
      pathIdList: selectAbsPathIdList,
    })
  );
  const handleClick = (i: number) => {
    console.log(pathList.slice(0, i + 1));
  };
  return (
    <div>
      {/* <IconButton>
        <ArrowBack />
      </IconButton> */}
      {/* <div>{absolutePath}</div> */}
      <Breadcrumbs
        separator={<NavigateNext fontSize='small' />}
        aria-label='breadcrumb'
      >
        {pathList.map(
          (x, i: number) => (
            // i !== pathList.length ? (
            <div
              key={i}
              className='pointer'
              // color='inherit'
              // href={pathIdList[i]}
              onClick={() => handleClick(i)}
            >
              {x}
            </div>
          )
          // ) : (
          //   <Typography key={i} color='textPrimary'>
          //     {x}
          //   </Typography>
          // )
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
