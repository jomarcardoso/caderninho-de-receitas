import './footer-2.scss';
import { generateClasses } from 'notebook-layout/utils/utils';
import { FC, HTMLProps } from 'react';

export const Footer2: FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  const classes = generateClasses({
    'footer-2': true,
    'theme-primary': true,
    [className]: className,
  });

  return (
    <footer className={classes} {...props}>
      {children}
    </footer>
  );
};
