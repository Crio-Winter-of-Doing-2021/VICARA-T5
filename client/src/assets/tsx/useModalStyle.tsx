import { makeStyles } from '@material-ui/core';

const useModalStyle = makeStyles({
  modal: {
    borderRadius: '6px',
    height: '85vh',
    maxWidth: '550px',
    '@media (min-width: 900px)': {
      width: '50vw',
    },
  },
  mediumModal: {
    borderRadius: '6px',
    height: '85vh',
    width: '450px',
  },
  largeModal: {
    borderRadius: '6px',
    height: '85vh',
    width: '90vw',
  },
  smallModal: {
    borderRadius: '6px',
    width: '350px',
  },
  modalHeader: {
    borderBottom: 'none',
    paddingTop: '24px',
    paddingRight: '24px',
    paddingBottom: '0',
    paddingLeft: '24px',
    minHeight: '16.43px',
  },
  modalTitle: {
    margin: '0',
    lineHeight: '1.42857143',
  },
  modalCloseButton: {
    color: '#999999',
    marginTop: '-16px',
    padding: '10px',
    opacity: '.9',
    lineHeight: '1',
    float: 'right',
  },
  modalBody: {
    paddingTop: '24px',
    paddingRight: '24px',
    paddingBottom: '16px',
    paddingLeft: '24px',
    position: 'relative',
    // textAlign: 'center',
  },
  modalFooter: {
    padding: '15px',
    textAlign: 'right',
    paddingTop: '0',
    margin: '0',
  },
  modalFooterCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default useModalStyle;
