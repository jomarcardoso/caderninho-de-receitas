import React, { FC, ReactNode, ReactElement } from 'react';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { IoClose } from 'react-icons/io5';
import './header.scss';

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
  const title = (
    <Typography
      variant="h1"
      component="h1"
      className="header__title"
      color={theme === 'dark' ? 'inherit' : 'textPrimary'}
      style={{ fontSize: String(pageName).length > 20 ? 18 : 21 }}
    >
      {pageName}
    </Typography>
  );

  return (
    <AppBar
      position="static"
      role="banner"
      className="header"
      style={{ textAlign }}
      color={theme === 'dark' ? 'primary' : 'inherit'}
    >
      <Container maxWidth="md" disableGutters>
        <Toolbar className="header__toolbar" variant="dense">
          {title}
          {tools}
          {onClose && (
            <IconButton
              onClick={onClose}
              color={theme === 'dark' ? 'inherit' : 'secondary'}
            >
              <SvgIcon>
                <IoClose />
              </SvgIcon>
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
