import React, { FC, ReactNode } from 'react';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    position: 'sticky',
    top: 0,
  },
  toolbar: {
    gap: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export interface HeaderProps {
  pageName?: ReactNode;
  textAlign?: 'center' | 'left' | 'right';
}

const Header: FC<HeaderProps & AppBarProps> = ({
  pageName = '',
  textAlign = 'left',
}) => {
  const classes = useStyles();

  const title = (
    <Typography
      variant="h1"
      component="h1"
      className={classes.title}
      color="textPrimary"
    >
      {pageName}
    </Typography>
  );

  return (
    <AppBar
      position="static"
      role="banner"
      className={classes.root}
      style={{ textAlign }}
    >
      <Container maxWidth="md" disableGutters>
        <Toolbar className={classes.toolbar}>{title}</Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
