import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header, { HeaderProps } from '../header';
import Main, { MainProps } from '../main';
import './layout.scss';

import { CurrentPage } from '../../services/page.service';
import Footer2, { Footer2Props } from '../footer2/footer2';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
  footerProps?: Footer2Props;
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
      {showFooter && <Footer2 {...footerProps} />}
    </Box>
  );
};

export default Layout;
