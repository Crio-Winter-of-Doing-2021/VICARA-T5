import React from 'react';

interface IProps {
  name: string;
}

const File = ({ name }: IProps) => {
  return (
    <div className='w4'>
      <span>{name}</span>
    </div>
  );
};

export default File;
