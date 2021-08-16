import React, { FC } from 'react';
import ButtonMUI, { ButtonProps } from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
