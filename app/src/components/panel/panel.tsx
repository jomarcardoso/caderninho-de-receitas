import type { FC, HTMLProps } from 'react';
import './panel.scss';

export const Panel: FC<HTMLProps<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className="panel" {...props}>
      <div className="panel__content">{children}</div>
    </div>
  );
};
