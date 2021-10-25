import React, { FC } from 'react';
import Modal, { ModalProps } from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  modal: {
    backgroundColor: '#ffffff88',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
});

const PageLoader: FC<Omit<ModalProps, 'children'>> = (props) => {
  const classes = useStyles();

  return (
    <Modal {...props} hideBackdrop>
      <div className={classes.modal}>
        <CircularProgress />
      </div>
    </Modal>
  );
};

export default PageLoader;
