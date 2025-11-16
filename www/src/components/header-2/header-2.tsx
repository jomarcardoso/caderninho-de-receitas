import { CiHome, CiSearch, CiUser } from 'react-icons/ci';
import { type FC, type HTMLProps } from 'react';
import './header-2.scss';
import Link from 'next/link';
import Logo from '../logo/logo';

export interface Header2Props extends HTMLProps<HTMLDivElement> {
  currentPage?: 'main' | 'my-recipes' | 'kitchen';
}

export const Header2: FC<Header2Props> = ({ ...props }) => {
  return (
    <header className="header-2" id="header" {...props}>
      {/* Left: go to home */}
      <Link className="header-2__button" href="/search" aria-label="Início">
        <CiSearch className="svg-icon" />
      </Link>

      <Link className="header-2__button" href="/">
        <Logo active={true} />
      </Link>

      {/* Right: go to user page */}
      <Link className="header-2__button" href="/user" aria-label="Usuário">
        <div className="svg-icon">
          <CiUser />
        </div>
      </Link>
    </header>
  );
};
