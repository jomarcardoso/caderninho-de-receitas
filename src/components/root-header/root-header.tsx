import React, { FC, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import SvgIcon from '@mui/material/SvgIcon';
import { CurrentPage } from '../../services/page.service';
import { primary, secondary } from '../page/page';
import Logo from '../logo/logo';
import CheffLightSvg from '../../assets/svg/cheff-light.svg';
import ListLightSvg from '../../assets/svg/list-light.svg';
import ListDuoSvg from '../../assets/svg/list-duo.svg';
import './root-header.scss';

interface Props {
  currentPage?: CurrentPage;
}

export type RootHeaderProps = Props & AppBarProps;

const Header: FC<RootHeaderProps> = ({ currentPage = 'HOME' }) => {
  function render() {
    return (
      <AppBar
        className="root-header"
        position="static"
        role="banner"
        color="inherit"
      >
        <Container maxWidth="md" disableGutters>
          <Toolbar variant="dense" className="root-header__toolbar">
            <IconButton href="#foods-panel" color="inherit">
              <SvgIcon>
                {currentPage === 'FOODS' ? (
                  <ListDuoSvg secondary={primary.main} />
                ) : (
                  <ListLightSvg />
                )}
              </SvgIcon>
            </IconButton>
            <Logo active={currentPage === 'HOME'} />
            <IconButton href="#recipe-panel" color="inherit">
              <SvgIcon>
                {currentPage === 'RECIPE' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <g className="fa-group">
                      <path
                        fill={primary.main}
                        d="M416 32a95 95 0 00-58 20 127 127 0 00-204 0A96 96 0 000 128c0 42 64 192 64 192h60l-12-151a8 8 0 017-8l16-2a8 8 0 019 8l12 153h83V168a8 8 0 018-8h16a8 8 0 018 8v152h85l12-153a8 8 0 019-8l16 2a8 8 0 017 8l-12 151h60s64-150 64-192a96 96 0 00-96-96z"
                        className="fa-secondary"
                      />
                      <path
                        fill={secondary.main}
                        d="M64 480a32 32 0 0032 32h320a32 32 0 0032-32V352H64z"
                        className="fa-primary"
                      />
                    </g>
                  </svg>
                ) : (
                  <CheffLightSvg />
                )}
              </SvgIcon>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  const renderMemo = useMemo(render, [currentPage]);

  return renderMemo;
};

export default Header;
