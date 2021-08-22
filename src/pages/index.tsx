/* eslint-disable */
import React, { FC, useContext, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
// import { ScrollSpy, createScrollSpyItem } from 'ovos';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import AccountContext from '../contexts/account-context';
import { AccountAndSet, ACCOUNT } from '../services/account.service';
import { CurrentPage } from '../services/page.service';
import Layout from '../components/layout/layout';
import MealCard from '../components/meal-card';
import Panel from '../components/panel/panel';
import MealPanel from '../panels/meal';
import SEO from '../components/seo';
import Page from '../components/page/page';
import FoodsPanel from '../panels/foods';
import FoodPanel from '../panels/food';
import { FOOD } from '../services/food';
import Footer from '../components/footer';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  display: {
    display: 'flex',
    width: '100vw',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    height: 'calc(100vh - 57px)',
    overflow: 'scroll',
  },
});

const DialogTransition: FC<SlideProps> = (props) => {
  return <Slide direction="right" {...props} />;
};

const Index: FC<{ location: Location }> = ({ location }) => {
  const { account = ACCOUNT }: AccountAndSet = useContext(AccountContext);
  const classes = useStyles();
  const [currentMealId, setCurrentMealId] = useState(0);
  const [editingMeal, setEditingMeal] = useState(true);
  const [hideLeftPanel, setHideLeftPanel] = useState(true);
  const [currentFood, setCurrentFood] = useState(FOOD);
  const [openedFood, setOpenedFood] = useState(false);
  const [currentPage, setCurrentPage] = useState(CurrentPage.HOME);

  useEffect(() => {
    setHideLeftPanel(false);
  }, []);

  useEffect(() => {
    if (!currentFood.name) return;

    setOpenedFood(true);
  }, [currentFood]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (typeof window === 'undefined') {
        return;
      }

      const { ScrollSpy, createScrollSpyItem } = await import('ovos');

      ScrollSpy({
        method: 'CURRENT',
        axis: 'x',
        elRelative: document.querySelector('#root-content') as HTMLElement,
        list: [
          createScrollSpyItem({
            callback: ({ active }) =>
              active && setCurrentPage(CurrentPage.FOODS),
            elContent: document.querySelector('#foods-panel') as HTMLElement,
            elMenu: document.querySelector('#foods-panel') as HTMLElement,
          }),
          createScrollSpyItem({
            callback: ({ active }) =>
              active && setCurrentPage(CurrentPage.HOME),
            elContent: document.querySelector('#main-panel') as HTMLElement,
            elMenu: document.querySelector('#main-panel') as HTMLElement,
          }),
          createScrollSpyItem({
            callback: ({ active }) =>
              active && setCurrentPage(CurrentPage.MEAL),
            elContent: document.querySelector('#meal-panel') as HTMLElement,
            elMenu: document.querySelector('#meal-panel') as HTMLElement,
          }),
        ],
      });

      clearInterval(interval);
    }, 1000);
  }, []);

  return (
    <Page>
      <Dialog
        fullScreen
        open={openedFood}
        TransitionComponent={DialogTransition}
      >
        <FoodPanel
          food={currentFood}
          headerProps={{ onClose: () => setOpenedFood(false) }}
        />
      </Dialog>
      <Box className={classes.display} id="root-content">
        <Panel
          id="foods-panel"
          style={{ display: hideLeftPanel ? 'none' : 'initial' }}
        >
          <FoodsPanel setCurrentFood={setCurrentFood} />
        </Panel>
        <Panel id="main-panel">
          <Layout
            currentPage={CurrentPage.HOME}
            headerProps={{ textAlign: 'center', pageName: 'Saúde em Pontos' }}
          >
            <Grid container spacing={4}>
              {account.meals.map((meal) => (
                <Grid item xs={12} sm={6} className={classes.card}>
                  <MealCard
                    meal={meal}
                    setMealId={setCurrentMealId}
                    setEditingMeal={setEditingMeal}
                  />
                </Grid>
              ))}
            </Grid>
          </Layout>
        </Panel>
        <Panel id="meal-panel">
          <MealPanel
            location={location}
            mealId={currentMealId}
            setMealId={setCurrentMealId}
            editing={editingMeal}
            setEditing={setEditingMeal}
          />
        </Panel>
        <SEO title="Saúde em pontos" />
      </Box>
      <Footer currentPage={currentPage} />
    </Page>
  );
};

export default Index;
