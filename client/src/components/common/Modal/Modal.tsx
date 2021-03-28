import React from 'react';
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import useModalStyle from '../../../assets/tsx/useModalStyle';
// import { IObject } from '../../../assets/ts/interfaces';

interface DialogAction {
  onBtnClick: any;
  btnText: string;
  btnStyle: Partial<ButtonProps>;
}

interface ModalProps {
  children: React.ReactElement;
  open: boolean;
  onClose: any;
  titleRed?: boolean;
  modalName: string;
  dialogTitle?: string;
  dialogTitleProps?: any;
  dialogActions?: DialogAction[];
  displayModalCloseBtn?: boolean;
  keepModalMounted?: boolean;
  contentProps?: any;
  disableDialogEscapeKeyDown?: boolean;
  smallModal?: boolean;
  mediumModal?: boolean;
}

const Modal = ({
  children,
  open,
  onClose,
  titleRed,
  modalName,
  dialogTitle,
  dialogTitleProps,
  dialogActions,
  displayModalCloseBtn,
  keepModalMounted,
  contentProps,
  disableDialogEscapeKeyDown,
  smallModal,
  mediumModal,
}: ModalProps) => {
  const classes = useModalStyle();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={`${modalName}-title`}
      aria-describedby={`${modalName}-content`}
      keepMounted={keepModalMounted}
      classes={{
        // root: classes.center,
        paper: smallModal
          ? classes.smallModal
          : mediumModal
          ? classes.mediumModal
          : classes.modal,
      }}
      disableEscapeKeyDown={disableDialogEscapeKeyDown}
    >
      <DialogTitle
        id={`${modalName}-title`}
        className={classes.modalHeader}
        style={{ textAlign: 'center' }}
      >
        <span className={`${titleRed ? 'red' : ''}`} {...dialogTitleProps}>
          {dialogTitle}
        </span>
        {displayModalCloseBtn && (
          <IconButton
            className={classes.modalCloseButton}
            // key='close'
            aria-label='Close'
            // color='inherit'
            onClick={onClose}
          >
            <Close />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent {...contentProps}>{children}</DialogContent>
      {dialogActions && dialogActions.length && (
        <DialogActions>
          {dialogActions.map((action: DialogAction, i: number) => (
            <Button key={i} onClick={action.onBtnClick} {...action.btnStyle}>
              {action.btnText}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
