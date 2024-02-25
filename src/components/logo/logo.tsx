import React, { FC, useMemo } from 'react';
import './logo.scss';
import { generateCSSClasses } from '../../services/dom/classes';

const Logo: FC<{ active?: boolean; contrast?: boolean }> = ({
  active = false,
  contrast = false,
}) => {
  const classes = useMemo(() => {
    return generateCSSClasses({
      logo: true,
      '-active': active,
      'logo--contrast': contrast,
    });
  }, [active, contrast]);

  return (
    <h1 className={classes}>
      <div className="logo__text-small">caderninho</div>
      <div className="logo__text-large">DE RECEITAS</div>
    </h1>
  );
};

export default Logo;
