import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header, { HeaderProps } from '../header';
import Main, { MainProps } from '../main';
import './layout.scss';

import { CurrentPage } from '../../services/page.service';
import Footer, { FooterProps } from '../footer/footer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 'calc(100vh - 28px)',
  },
  main: {
    flex: 1,
  },
});

interface Props {
  showHeader?: boolean;
  showFooter?: boolean;
  currentPage?: CurrentPage;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  mainProps?: MainProps;
}

const Layout: FC<Props> = ({
  children,
  showHeader = true,
  showFooter = true,
  headerProps,
  footerProps,
  mainProps,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} bgcolor="gray.700">
      {showHeader && <Header {...headerProps} />}
      <Main className={classes.main} {...mainProps}>
        {children}
      </Main>
      {showFooter && <Footer {...footerProps} />}
    </Box>
  );
};

export default Layout;
