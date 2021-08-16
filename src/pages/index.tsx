import React, { FC, useContext, useState } from 'react';
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
import Page from '../components/page/page';

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
  const [editingMeal, setEditingMeal] = useState(false);

  return (
    <Page name="Menu">
      <Box className={classes.display}>
        <Panel>
          <Layout currentPage={CurrentPage.HOME} pageName="Menu">
            <Grid container spacing={4}>
              {account.meals.map((meal) => (
                <Grid item xs={12} sm={6} className={classes.card}>
                  <MealCard meal={meal} setMealId={setCurrentMealId} />
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
      </Box>
    </Page>
  );
};

export default Index;
