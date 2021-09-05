import React, { FC, useMemo } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { CurrentPage } from '../services/page.service';
import { borderLight, primary } from './page/page';
import Logo from './logo/logo';

const useStyles = makeStyles({
  root: {
    bottom: 0,
    overflow: 'hidden',
    position: 'sticky',
    ...borderLight,
  },
  button: {
    display: 'block',
  },
});

interface Props {
  currentPage: CurrentPage;
}

const Footer: FC<Props> = ({ currentPage = CurrentPage.HOME }) => {
  const classes = useStyles();

  function render() {
    return (
      <Box borderTop={1} component="footer" className={classes.root} zIndex={1}>
        <BottomNavigation>
          <BottomNavigationAction
            href="#foods-panel"
            label="Alimentos"
            className={classes.button}
            icon={
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
            }
          />

          <BottomNavigationAction
            href="#main-panel"
            label="Início"
            className={classes.button}
            icon={<Logo active={currentPage === CurrentPage.HOME} />}
          />
          <BottomNavigationAction
            href="#recipe-panel"
            className={classes.button}
            label="Cadastrar refeição"
            icon={
              <SvgIcon>
                {currentPage === CurrentPage.RECIPE ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <g className="fa-group">
                      <path
                        fill={primary.main}
                        d="M416 32a95 95 0 00-58 20 127 127 0 00-204 0A96 96 0 000 128c0 42 64 192 64 192h60l-12-151a8 8 0 017-8l16-2a8 8 0 019 8l12 153h83V168a8 8 0 018-8h16a8 8 0 018 8v152h85l12-153a8 8 0 019-8l16 2a8 8 0 017 8l-12 151h60s64-150 64-192a96 96 0 00-96-96z"
                        className="fa-secondary"
                      />
                      <path
                        fill="currentColor"
                        d="M64 480a32 32 0 0032 32h320a32 32 0 0032-32V352H64z"
                        className="fa-primary"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M416 32a95 95 0 00-58 20 127 127 0 00-204 0A96 96 0 000 128c0 42 64 224 64 224v128a32 32 0 0032 32h320a32 32 0 0032-32V352s64-182 64-224a96 96 0 00-96-96zm0 448H96v-96h320zm0-128h-44l12-151a8 8 0 00-7-8l-16-2h-1a8 8 0 00-8 8l-12 153h-69V200a8 8 0 00-8-8h-16a8 8 0 00-8 8v152h-67l-12-153a8 8 0 00-8-8h-1l-16 2a8 8 0 00-7 8l12 151H96S32 151 32 128a64 64 0 0164-64 63 63 0 0138 13l26 20 19-26a95 95 0 01154 0l19 26 26-20a63 63 0 0138-13 64 64 0 0164 64c0 23-64 224-64 224z"
                    />
                  </svg>
                )}
              </SvgIcon>
            }
          />
        </BottomNavigation>
      </Box>
    );
  }

  const renderMemo = useMemo(render, [currentPage, classes]);

  return renderMemo;
};

export default Footer;
