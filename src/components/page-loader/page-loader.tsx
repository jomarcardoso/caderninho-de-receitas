import React, { FC } from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import './page-loader.scss';

const PageLoader: FC<Omit<ModalProps, 'children'>> = (props) => {
  return (
    <Modal {...props} className="page-loader" hideBackdrop>
      <div className="page-loader__bg">
        <CircularProgress />
      </div>
    </Modal>
  );
};

export default PageLoader;
