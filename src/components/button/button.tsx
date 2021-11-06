import React, { FC } from 'react';
import ButtonMUI, { ButtonProps } from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { borderSecondary } from '../page/page';

const useStyles = makeStyles({
  root: {
    ...borderSecondary,
  },
});

const Button: FC<ButtonProps> = ({ children = '', ...props }) => {
  const classes = useStyles();

  return (
    <ButtonMUI {...props} className={classes.root}>
      {children}
    </ButtonMUI>
  );
};

export default Button;
