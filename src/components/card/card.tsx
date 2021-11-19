import React, { FC } from 'react';
import CardMUI, { CardProps } from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { borderPrimary } from '../page/page';

const useStyles = makeStyles({
  root: {
    ...borderPrimary,
    overflow: 'hidden',
  },
});

const Card: FC<CardProps> = ({ children = '', className, ...props }) => {
  const classes = useStyles();

  return (
    <CardMUI
      {...props}
      variant="outlined"
      className={`${classes.root} ${className}`}
    >
      {children}
    </CardMUI>
  );
};

export default Card;
