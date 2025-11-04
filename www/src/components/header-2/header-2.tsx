import { type FC, type HTMLProps, useMemo } from 'react';
import './header-2.scss';
import Link from 'next/link';
import Logo from '../logo/logo';
import CheffLightSvg from '../icons/cheff-light';
import ListLightSvg from '../icons/list-light';
import ListDuoSvg from '../icons/list-duo';

export interface Header2Props extends HTMLProps<HTMLDivElement> {
  currentPage: 'main' | 'my-recipes' | 'kitchen';
}

export const Header2: FC<Header2Props> = ({
  currentPage = 'main',
  ...props
}) => {
  return (
    <header className="header-2" id="header" {...props}>
      <Link
        className="header-2__button"
        href="/my-recipes"
        aria-current={currentPage === 'my-recipes' ? 'page' : undefined}
      >
        <div className="svg-icon">
          {currentPage === 'my-recipes' ? <ListDuoSvg /> : <ListLightSvg />}
        </div>
      </Link>

      <Link
        className="header-2__button"
        href="/"
        aria-current={currentPage === 'main' ? 'page' : undefined}
      >
        <Logo active={currentPage === 'main'} />
      </Link>

      <Link
        className="header-2__button"
        href="/kitchen"
        aria-current={currentPage === 'kitchen' ? 'page' : undefined}
      >
        <div className="svg-icon">
          {currentPage === 'kitchen' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g className="fa-group">
                <path
                  fill="var(--color-primary-main)"
                  d="M416 32a95 95 0 00-58 20 127 127 0 00-204 0A96 96 0 000 128c0 42 64 192 64 192h60l-12-151a8 8 0 017-8l16-2a8 8 0 019 8l12 153h83V168a8 8 0 018-8h16a8 8 0 018 8v152h85l12-153a8 8 0 019-8l16 2a8 8 0 017 8l-12 151h60s64-150 64-192a96 96 0 00-96-96z"
                  className="fa-secondary"
                />
                <path
                  fill="var(--color-dark-main)"
                  d="M64 480a32 32 0 0032 32h320a32 32 0 0032-32V352H64z"
                  className="fa-primary"
                />
              </g>
            </svg>
          ) : (
            <CheffLightSvg />
          )}
        </div>
      </Link>
    </header>
  );
};
