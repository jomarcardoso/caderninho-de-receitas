import React, { FC } from 'react';
import ButtonMUI, { ButtonProps } from '@mui/material/Button';
import './button.scss';

const Button: FC<ButtonProps> = ({ children = '', ...props }) => {
  return (
    <ButtonMUI {...props} className="button">
      {children}
    </ButtonMUI>
  );
};

export default Button;
