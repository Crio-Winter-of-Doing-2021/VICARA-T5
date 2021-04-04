import React from 'react';

const ViewFile = ({ url }: { url: string }) => {
  if (url)
    return (
      <iframe
        // src={`https://docs.google.com/viewerng/viewer?url=${url}&embedded=true`} // for pdf files
        src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
        // src={url}
        style={{ border: '1px solid #666CCC' }}
        // frameborder='0'
        height='100%'
        width='100%'
        title='view-item'
      />
    );
  return null;
};

export default ViewFile;
