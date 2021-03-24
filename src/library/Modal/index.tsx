import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Close from '@material-ui/icons/Close';

import styles from 'assets/jss/material-kit-react/modalStyle';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal = ({ open = false, onClose = () => {}, children, className = '', title = '' }) => {
  const classes = useStyles();
  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal,
      }}
      className={`modal-container ${className}`}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle disableTypography className={classes.modalHeader}>
        <IconButton className={classes.modalCloseButton} key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <Close className={classes.modalClose} />
        </IconButton>
        {title && <h3 className={classes.modalTitle}>{title}</h3>}
      </DialogTitle>
      <DialogContent className={classes.modalBody}>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
