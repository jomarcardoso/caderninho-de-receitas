import './layout-2.scss';
import { generateClasses } from 'notebook-layout/utils/utils';
import { FC, HTMLProps } from 'react';

export interface Layout2Props extends HTMLProps<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Layout2: FC<Layout2Props> = ({
  className = '',
  header,
  footer,
  children,
  ...props
}) => {
  const classes = generateClasses({
    'layout-2': true,
    [className]: className,
  });

  return (
    <div className={classes} {...props}>
      {header && <div className="layout-2__header">{header}</div>}

      {children && <div className="layout-2__main">{children}</div>}

      {footer && <div className="layout-2__footer">{footer}</div>}
    </div>
  );
};
