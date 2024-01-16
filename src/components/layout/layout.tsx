import React, { FC, UIEvent, useState, useCallback, forwardRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Header, { HeaderProps } from '../header/header';
import Main, { MainProps } from '../main';
import './layout.scss';
import Footer, { FooterProps } from '../footer/footer';
import { generateCSSClasses } from '../../services/dom/classes';
import { isMobile } from '../../services/user-agent/user-agent.service';

interface Props {
  showHeader?: boolean;
  showFooter?: boolean;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  mainProps?: MainProps;
  footerMenu?: boolean;
}

export type LayoutProps = Props & BoxProps;

const Layout: FC<LayoutProps> = forwardRef(
  (
    {
      children,
      showHeader = true,
      showFooter = true,
      headerProps,
      footerProps,
      footerMenu = false,
      mainProps,
      className = '',
      ...props
    },
    ref,
  ) => {
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
        ref={ref}
      >
        {showHeader && <Header {...headerProps} />}
        {footerMenu && <div className="layout__overlay" />}
        <Main className="layout__main" {...mainProps}>
          {children}
        </Main>
        {showFooter && isMobile() && (
          <Footer open={open} footerMenu={footerMenu} {...footerProps} />
        )}
      </Box>
    );
  },
);

export default Layout;
