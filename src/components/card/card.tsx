import React, { FC } from 'react';
import CardMUI, { CardProps } from '@mui/material/Card';
import './card.scss';

const Card: FC<CardProps> = ({ children = '', className, ...props }) => {
  return (
    <CardMUI {...props} variant="outlined" className={`card ${className}`}>
      {children}
    </CardMUI>
  );
};

export default Card;
