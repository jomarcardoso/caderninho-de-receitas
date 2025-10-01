import React, { FC, useContext } from 'react';
import LoadingSvg from '../../assets/svg/loading.svg';
import LoadingContext from '../../providers/loading/loading.context';
import './loading-overlay.scss';

const LoadingOverlay: FC = () => {
  const { loading } = useContext(LoadingContext);

  if (!loading) {
    return null;
  }

  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-busy="true">
      <LoadingSvg />
    </div>
  );
};

export default LoadingOverlay;
