import React, { FC, ButtonHTMLAttributes } from 'react';
import './button.scss';

interface Props {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  background?: 'white' | 'light' | 'dark';
}

export type ButtonProps = Props & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  className = '',
  children = '',
  variant = 'primary',
  type = 'button',
  background = 'white',
  fullWidth = false,
  ...props
}) => {
  let classes = 'button';

  classes += className ? ` ${className}` : '';
  classes += variant === 'secondary' ? ' button--secondary' : '';
  classes += fullWidth ? ' button--full' : '';
  classes += background === 'light' ? ' button--on-light' : '';

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
};
