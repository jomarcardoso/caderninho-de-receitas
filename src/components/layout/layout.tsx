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
}

export type LayoutProps = Props & BoxProps;

const Layout: FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  headerProps,
  footerProps,
  mainProps,
  ...props
}) => {
  return (
    <Box className="layout" bgcolor="gray.700" {...props}>
      {showHeader && <Header {...headerProps} />}
      <Main className="layout__main" {...mainProps}>
        {children}
      </Main>
      {showFooter && <Footer {...footerProps} />}
    </Box>
  );
};

export default Layout;
