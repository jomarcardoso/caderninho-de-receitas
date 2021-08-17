import React, { FC } from 'react';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    top: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
}));

export interface HeaderProps {
  pageName?: string;
  goBackLink?: string;
}

const Header: FC<HeaderProps & AppBarProps> = ({
  pageName = '',
  goBackLink = '',
}) => {
  const classes = useStyles();

  return (
    <AppBar position="static" role="banner" className={classes.root}>
      <Container maxWidth="md" disableGutters>
        <Toolbar>
          {goBackLink && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              href={goBackLink}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h1" component="h1" className={classes.title}>
            {pageName}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
