import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import SvgIcon from '@material-ui/core/SvgIcon';
import { CurrentPage } from '../../services/page.service';
import { primary } from '../page/page';

interface Header2Props {
  currentPage: CurrentPage;
}

const Header2: FC<Header2Props & AppBarProps> = ({
  currentPage = CurrentPage.HOME,
}) => {
  return (
    <AppBar position="static" role="banner" color="inherit">
      <Container maxWidth="md" disableGutters>
        <Toolbar>
          <IconButton
            href="#foods-panel"
            // label="Alimentos"
            // className={classes.button}
          >
            <SvgIcon>
              {currentPage === CurrentPage.FOODS ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-list-ul fa-w-16 fa-3x"
                >
                  <g className="fa-group">
                    <path
                      fill={primary.main}
                      d="M496 384H176a16 16 0 00-16 16v32a16 16 0 0016 16h320a16 16 0 0016-16v-32a16 16 0 00-16-16zm0-320H176a16 16 0 00-16 16v32a16 16 0 0016 16h320a16 16 0 0016-16V80a16 16 0 00-16-16zm0 160H176a16 16 0 00-16 16v32a16 16 0 0016 16h320a16 16 0 0016-16v-32a16 16 0 00-16-16z"
                      className="fa-secondary"
                    />
                    <path
                      fill="currentColor"
                      d="M48 48a48 48 0 1048 48 48 48 0 00-48-48zm0 160a48 48 0 1048 48 48 48 0 00-48-48zm0 160a48 48 0 1048 48 48 48 0 00-48-48z"
                      className="fa-primary"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-list-ul fa-w-16 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M32 224c-17 0-32 14-32 32s15 32 32 32a32 32 0 000-64zm0-160C15 64 0 78 0 96s15 32 32 32a32 32 0 000-64zm0 320c-17 0-32 14-32 32s15 32 32 32a32 32 0 000-64zM504 80H136a8 8 0 00-8 8v16a8 8 0 008 8h368a8 8 0 008-8V88a8 8 0 00-8-8zm0 160H136a8 8 0 00-8 8v16a8 8 0 008 8h368a8 8 0 008-8v-16a8 8 0 00-8-8zm0 160H136a8 8 0 00-8 8v16a8 8 0 008 8h368a8 8 0 008-8v-16a8 8 0 00-8-8z"
                  />
                </svg>
              )}
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header2;
