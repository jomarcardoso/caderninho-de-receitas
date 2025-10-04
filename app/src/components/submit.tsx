import React, { ButtonHTMLAttributes, FC } from 'react';
import { IoSaveOutline } from 'react-icons/io5';
import { Button } from './button';

const SubmitComponent: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <Button fullWidth type="submit" {...props}>
    <IoSaveOutline />

    {children}
  </Button>
);

export default SubmitComponent;
