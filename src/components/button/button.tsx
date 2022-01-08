import React, { FC } from 'react';
import ButtonMUI, { ButtonProps } from '@mui/material/Button';
import './button.scss';

const Button: FC<ButtonProps> = ({
  className = '',
  children = '',
  ...props
}) => {
  const classes = `button ${className}`;

  return (
    <ButtonMUI variant="contained" className={classes} {...props}>
      {children}
    </ButtonMUI>
  );
};

export default Button;
