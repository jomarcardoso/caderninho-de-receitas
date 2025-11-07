import './layout-2.scss';
import { generateClasses } from 'notebook-layout/utils/utils';
import { type FC, type HTMLProps, type ReactNode } from 'react';

export interface Layout2Props extends HTMLProps<HTMLDivElement> {
  header?: ReactNode;
  aside?: ReactNode;
  navbar?: ReactNode;
}

export const Layout2: FC<Layout2Props> = ({
  className = '',
  header,
  aside,
  navbar,
  children,
  ...props
}) => {
  const classes = generateClasses({
    'layout-2': true,
    [className]: className,
  });

  return (
    <div className={classes} {...props}>
      {header && (
        <div className="layout-2__header" data-ovo-sticky-header>
          {header}
        </div>
      )}

      {children && <div className="layout-2__aside">{aside}</div>}

      {children && <div className="layout-2__main">{children}</div>}

      {navbar && <div className="layout-2__navbar">{navbar}</div>}
    </div>
  );
};
