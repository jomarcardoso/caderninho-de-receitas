import React, { FC, HTMLProps } from 'react';
import './panel.scss';

const Panel: FC<HTMLProps<HTMLDivElement>> = ({ children, ...props }) => (
  <div className="panel" {...props}>
    {children}
  </div>
);

export default Panel;
