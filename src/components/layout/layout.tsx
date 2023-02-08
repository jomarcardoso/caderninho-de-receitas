import React, { FC, UIEvent, useState, useCallback } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Header, { HeaderProps } from '../header/header';
import Main, { MainProps } from '../main';
import './layout.scss';

import { CurrentPage } from '../../services/page.service';
import Footer, { FooterProps } from '../footer/footer';
import { generateCSSClasses } from '../../services/dom/classes';

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
  className = '',
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const classes = generateCSSClasses({
    layout: true,
    'layout--footer-menu': footerMenu,
    [className]: className,
  });

  const handleOpen = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).scrollTop) {
        if (!open) {
          setOpen(true);
        }

        return;
      }

      if (open) {
        setOpen(false);
      }
    },
    [open],
  );

  return (
    <Box
      className={classes}
      onScroll={handleOpen}
      bgcolor="gray.700"
      {...props}
    >
      {showHeader && <Header {...headerProps} />}
      {footerMenu && <div className="layout__overlay" />}
      <Main className="layout__main" {...mainProps}>
        {children}
      </Main>
      {showFooter && (
        <Footer open={open} footerMenu={footerMenu} {...footerProps} />
      )}
    </Box>
  );
};

export default Layout;
