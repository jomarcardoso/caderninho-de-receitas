import { type FC, type HTMLProps, useMemo } from 'react';
import './header-2.scss';
import Link from 'next/link';
import Logo from '../logo/logo';
import CheffLightSvg from '../icons/cheff-light';
import ListLightSvg from '../icons/list-light';
import ListDuoSvg from '../icons/list-duo';

export interface Header2Props extends HTMLProps<HTMLDivElement> {
  currentPage: 'main' | 'my-recipes' | 'recipe';
}

export const Header2: FC<Header2Props> = ({
  currentPage = 'main',
  ...props
}) => {
  return (
    <header className="header-2" id="header" data-ovo-sticky-header {...props}>
      <div className="header-2__wrapper">
        <Link
          className="header-2__button"
          href="/my-recipes"
          aria-current={currentPage === 'my-recipes' ? 'page' : undefined}
        >
          <div
            className="svg-icon"
            style={{
              color:
                currentPage === 'my-recipes'
                  ? 'var(--color-primary-main)'
                  : undefined,
            }}
          >
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
          href="/recipe"
          aria-current={currentPage === 'recipe' ? 'page' : undefined}
        >
          <div
            className="svg-icon"
            style={{
              color:
                currentPage === 'recipe'
                  ? 'var(--color-primary-main)'
                  : undefined,
            }}
          >
            <CheffLightSvg />
          </div>
        </Link>
      </div>
    </header>
  );
};
