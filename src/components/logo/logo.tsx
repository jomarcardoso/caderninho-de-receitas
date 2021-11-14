import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import './logo.scss';

const Logo: FC<{ active: boolean }> = ({ active = false }) => {
  const className = `logo${active ? ' logo--active' : ''}`;

  return (
    <Typography component="h1" variant="h1" className={className}>
      <div className="logo__text-small">caderninho</div>
      <div className="logo__text-large">DE RECEITAS</div>
    </Typography>
  );
};

export default Logo;
