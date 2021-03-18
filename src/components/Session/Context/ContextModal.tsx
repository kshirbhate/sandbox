import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Close from '@material-ui/icons/Close';
import Context from '.';
import './index.scss';

import styles from 'assets/jss/material-kit-react/modalStyle';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ContextModal = ({ show = false, onClose = () => {} }) => {
  const classes = useStyles();
  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal,
      }}
      className="context-modal-container"
      open={show}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle disableTypography className={classes.modalHeader}>
        <IconButton className={classes.modalCloseButton} key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <Close className={classes.modalClose} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.modalBody}>
        <Context />
      </DialogContent>
    </Dialog>
  );
};

export default ContextModal;
