import { type FC, type HTMLProps } from 'react';
import './header-2.scss';
import Link from 'next/link';
import Logo from '../logo/logo';
// Ionicons custom element

export interface Header2Props extends HTMLProps<HTMLDivElement> {
  // currentPage prop kept for backward compatibility, but not used
  currentPage?: 'main' | 'my-recipes' | 'kitchen';
}

export const Header2: FC<Header2Props> = ({
  // currentPage is ignored intentionally
  ...props
}) => {
  return (
    <header className="header-2" id="header" {...props}>
      {/* Left: go to home */}
      <Link className="header-2__button" href="/" aria-label="Início">
        <div className="svg-icon">
          <ion-icon name="home-outline" />
        </div>
      </Link>

      <Link className="header-2__button" href="/">
        <Logo active={false} />
      </Link>

      {/* Right: go to user page */}
      <Link className="header-2__button" href="/user" aria-label="Usuário">
        <div className="svg-icon">
          <ion-icon name="person-outline" />
        </div>
      </Link>
    </header>
  );
};
