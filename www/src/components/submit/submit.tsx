'use client';
import type { ButtonHTMLAttributes, FC } from 'react';
import { IoSaveOutline } from 'react-icons/io5';
import { Button } from 'notebook-layout';

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

