import { type FC, useContext } from 'react';
import LoadingSvg from 'images/svg/loading.svg?react';
import LoadingContext from '../../providers/loading/loading.context';
import './loading-overlay.scss';

const LoadingOverlay: FC = () => {
  const { loading } = useContext(LoadingContext);

  if (!loading) {
    return null;
  }

  return (
    <div
      className="loading-overlay"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingSvg />
    </div>
  );
};

export default LoadingOverlay;
