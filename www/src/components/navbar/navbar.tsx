import './navbar.scss';
import { generateClasses } from 'notebook-layout/utils/utils';
import { FC, HTMLProps } from 'react';

export const Navbar: FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  const classes = generateClasses({
    navbar: true,
    'theme-primary': true,
    [className]: className,
  });

  return (
    <nav className={classes} {...props}>
      {children}
    </nav>
  );
};
