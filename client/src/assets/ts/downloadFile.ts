const downloadFile = (url: string, filename?: string) => {
  const element = document.createElement('a');

  element.setAttribute('href', url);
  element.setAttribute('target', '_blank');
  element.setAttribute('download', filename || 'download');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export default downloadFile;
