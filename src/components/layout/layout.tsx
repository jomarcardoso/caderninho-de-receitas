import React, { FC } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Header, { HeaderProps } from '../header/header';
import Main, { MainProps } from '../main';
import './layout.scss';

import { CurrentPage } from '../../services/page.service';
import Footer, { FooterProps } from '../footer/footer';

interface Props {
  showHeader?: boolean;
  showFooter?: boolean;
  currentPage?: CurrentPage;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  mainProps?: MainProps;
  footerMenu?: boolean;
}

export type LayoutProps = Props & BoxProps;

const Layout: FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  headerProps,
  footerProps,
  footerMenu = false,
  mainProps,
  className,
  ...props
}) => {
  const classList = ['layout'];

  if (className) {
    classList.push(className);
  }

  if (footerMenu) {
    classList.push('layout--footer-menu');
  }

  const classes = classList.join(' ');

  return (
    <Box className={classes} bgcolor="gray.700" {...props}>
      {showHeader && <Header {...headerProps} />}
      {footerMenu && <div className="layout__overlay" />}
      <Main className="layout__main" {...mainProps}>
        {children}
      </Main>
      {showFooter && <Footer footerMenu={footerMenu} {...footerProps} />}
    </Box>
  );
};

export default Layout;
