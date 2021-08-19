import React, { FC, useMemo } from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import HomeIcon from '@material-ui/icons/Home';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CurrentPage } from '../services/page.service';

const useStyles = makeStyles({
  root: {
    position: 'sticky',
    bottom: 0,
    overflow: 'hidden',
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
      <Box
        borderTop={1}
        borderColor="text.secondary"
        component="footer"
        className={classes.root}
        zIndex={1}
      >
        <BottomNavigation>
          <BottomNavigationAction
            href="#foods-panel"
            label="Alimentos"
            className={classes.button}
            icon={
              currentPage === CurrentPage.FOODS ? (
                <LocalPizzaIcon color="primary" />
              ) : (
                <LocalPizzaIcon />
              )
            }
          />

          <BottomNavigationAction
            href="#main-panel"
            label="Início"
            className={classes.button}
            icon={
              currentPage === CurrentPage.HOME ? (
                <HomeIcon color="primary" />
              ) : (
                <HomeOutlinedIcon />
              )
            }
          />
          <BottomNavigationAction
            href="#meal-panel"
            className={classes.button}
            label="Cadastrar refeição"
            icon={
              <RestaurantOutlinedIcon
                color={currentPage === CurrentPage.MEAL ? 'primary' : 'inherit'}
              />
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
