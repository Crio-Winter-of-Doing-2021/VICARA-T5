import React from 'react';

interface IProps {
  name: string;
}

const File = ({ name }: IProps) => {
  return (
    <div className='w4 items-center justify-center flex'>
      <span>{name}</span>
    </div>
  );
};

export default File;
