import React, { FC, useMemo } from 'react';
import './logo.scss';
import { generateClasses } from '../../services/dom/classes';

const Logo: FC<{ active?: boolean; contrast?: boolean }> = ({
  active = false,
  contrast = false,
}) => {
  const classes = useMemo(() => {
    return generateClasses({
      logo: true,
      '-active': active,
      'logo--contrast': contrast,
    });
  }, [active, contrast]);

  return (
    <strong className={classes}>
      <div className="logo__text-small">caderninho</div>
      <div className="logo__text-large">DE RECEITAS</div>
    </strong>
  );
};

export default Logo;
