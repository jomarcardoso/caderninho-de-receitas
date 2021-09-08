import React, { FC, ReactNode, ReactElement } from 'react';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
  root: {
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
  onClose?(): void;
  theme?: 'light' | 'dark';
  tools?: ReactNode | ReactElement;
}

const Header: FC<HeaderProps & AppBarProps> = ({
  pageName = '',
  textAlign = 'left',
  onClose,
  theme = 'light',
  tools,
}) => {
  const classes = useStyles();

  const title = (
    <Typography
      variant="h1"
      component="h1"
      className={classes.title}
      color={theme === 'dark' ? 'inherit' : 'textPrimary'}
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
      color={theme === 'dark' ? 'primary' : 'inherit'}
    >
      <Container maxWidth="md" disableGutters>
        <Toolbar className={classes.toolbar} variant="dense">
          {title}
          {tools}
          {onClose && (
            <IconButton
              onClick={onClose}
              color={theme === 'dark' ? 'inherit' : 'secondary'}
            >
              <SvgIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path
                    fill="currentColor"
                    d="M194 256l103-103 21-21c3-3 3-8 0-11l-23-23c-3-3-8-3-11 0L160 222 36 98c-3-3-8-3-11 0L2 121c-3 3-3 8 0 11l124 124L2 380c-3 3-3 8 0 11l23 23c3 3 8 3 11 0l124-124 103 103 21 21c3 3 8 3 11 0l23-23c3-3 3-8 0-11L194 256z"
                  />
                </svg>
              </SvgIcon>
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
