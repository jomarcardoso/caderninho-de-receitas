import React, { FC, ReactNode, ReactElement } from 'react';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import CloseIcon from '../assets/svg/close-light.svg';

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
                <CloseIcon />
              </SvgIcon>
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
