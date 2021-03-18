import React from 'react';
import './Loader.css';

const DottedLineLoader = () => {
  return (
    <div className='dotted-line-spinner'>
      <div className='bounce1' />
      <div className='bounce2' />
      <div className='bounce3' />
    </div>
  );
};

export default DottedLineLoader;
