import React, { FC, useContext, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
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

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  display: {
    display: 'flex',
    width: '100vw',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    height: '100vh',
    overflow: 'scroll',
  },
});

const Index: FC<{ location: Location }> = ({ location }) => {
  const { account = ACCOUNT }: AccountAndSet = useContext(AccountContext);
  const classes = useStyles();
  const [currentMealId, setCurrentMealId] = useState(0);
  const [editingMeal, setEditingMeal] = useState(true);
  const [hideLeftPanel, setHideLeftPanel] = useState(true);

  useEffect(() => {
    setHideLeftPanel(false);
  }, []);

  return (
    <Page>
      <Box className={classes.display}>
        <Panel
          id="foods-panel"
          style={{ display: hideLeftPanel ? 'none' : 'initial' }}
        >
          <FoodsPanel />
        </Panel>
        <Panel id="main-panel">
          <Layout currentPage={CurrentPage.HOME} pageName="Saúde em pontos">
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
    </Page>
  );
};

export default Index;
