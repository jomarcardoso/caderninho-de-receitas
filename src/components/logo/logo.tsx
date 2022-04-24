import React, { FC } from 'react';
import './logo.scss';

const Logo: FC<{ active: boolean }> = ({ active = false }) => {
  const classes = `logo${active ? ' logo--active' : ''}`;

  return (
    <h1 className={classes}>
      <div className="logo__text-small">caderninho</div>
      <div className="logo__text-large">DE RECEITAS</div>
    </h1>
  );
};

export default Logo;
