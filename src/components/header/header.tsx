import React, { FC, ReactNode, ReactElement, HTMLProps } from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { IoClose } from 'react-icons/io5';
import './header.scss';

interface Props {
  pageName?: ReactNode;
  onClose?(): void;
  tools?: ReactNode | ReactElement;
}

export type HeaderProps = Props & HTMLProps<HTMLDivElement>;

const Header: FC<HeaderProps> = ({ pageName = '', onClose, tools }) => {
  const title = (
    <h1
      className="header__title h2"
      style={{ fontSize: String(pageName).length > 20 ? 18 : 21 }}
    >
      {pageName}
    </h1>
  );

  return (
    <header className="header">
      <div className="header__content">
        {title}
        {tools}
        {onClose && (
          <button className="header__button" onClick={onClose}>
            <SvgIcon>
              <IoClose />
            </SvgIcon>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
