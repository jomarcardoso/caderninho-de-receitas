import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header, { HeaderProps } from '../header';
import Main from '../main';
import Footer from '../footer';
import './layout.scss';

import { CurrentPage } from '../../services/page.service';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
  },
});

interface Props {
  pageName?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  currentPage?: CurrentPage;
  headerProps?: HeaderProps;
}

const Layout: FC<Props> = ({
  children,
  pageName = '',
  showHeader = true,
  headerProps,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} bgcolor="gray.700">
      {showHeader && <Header {...headerProps} pageName={pageName} />}
      <Main className={classes.main}>{children}</Main>
    </Box>
  );
};

export default Layout;
