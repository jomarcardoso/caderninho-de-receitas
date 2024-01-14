import React, { FC, HTMLProps } from 'react';
import './desktop-header.scss';
import Logo from '../logo/logo';

export type DesktopHeaderProps = HTMLProps<HTMLDivElement>;

const DesktopHeader: FC<DesktopHeaderProps> = () => {
  return (
    <div className="desktop-header">
      <div className="container">
        <Logo contrast />
      </div>
    </div>
  );
};

export default DesktopHeader;
