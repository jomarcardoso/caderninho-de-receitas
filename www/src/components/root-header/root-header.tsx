import React, { FC, HTMLProps, useMemo } from 'react';
import Logo from '../logo/logo';
import CheffLightSvg from '../../assets/svg/cheff-light.svg';
import ListLightSvg from '../../assets/svg/list-light.svg';
import ListDuoSvg from '../../assets/svg/list-duo.svg';
import './root-header.scss';
import { useNavigation } from '../../providers';

export type RootHeaderProps = HTMLProps<HTMLDivElement>;

const Header: FC<RootHeaderProps> = (props) => {
  const { goTo, navigation } = useNavigation();
  const currentPageHash = navigation.stack?.[1] || '#main';

  function render() {
    return (
      <header className="root-header" id="header" {...props}>
        <div className="root-header__wrapper">
          <button
            className="root-header__button"
            onClick={() => goTo('#foods')}
          >
            <div className="svg-icon">
              {currentPageHash === '#foods' ? (
                <ListDuoSvg secondary="var(--color-primary-main)" />
              ) : (
                <ListLightSvg />
              )}
            </div>
          </button>
          <button
            className="root-header__button"
            type="button"
            onClick={() => goTo('#main')}
          >
            <Logo active={currentPageHash === '#main'} />
          </button>
          <button
            className="root-header__button"
            onClick={() => goTo('#recipe')}
          >
            <div className="svg-icon">
              {currentPageHash === '#recipe' ? (
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
          </button>
        </div>
      </header>
    );
  }

  const renderMemo = useMemo(render, [currentPageHash, goTo, props]);

  return renderMemo;
};

export default Header;
