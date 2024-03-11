import React, { FC, ButtonHTMLAttributes } from 'react';

interface Props {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  contrast?: 'white' | 'light' | 'dark';
}

export type ButtonProps = Props & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  className = '',
  children = '',
  variant = 'primary',
  type = 'button',
  contrast = 'white',
  fullWidth = false,
  ...props
}) => {
  let classes = 'button';

  classes += className ? ` ${className}` : '';
  classes += variant === 'secondary' ? ' button--secondary' : '';
  classes += fullWidth ? ' button--full' : '';
  classes += contrast === 'light' ? ' button--on-light' : '';
  classes += contrast === 'dark' ? ' button--on-dark' : '';

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
};
