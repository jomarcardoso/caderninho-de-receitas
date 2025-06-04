import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default (): null => {
  useEffect(() => {
    navigate('/');
  }, []);

  return null;
};
