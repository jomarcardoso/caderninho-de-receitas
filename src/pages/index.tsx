import React, { FC, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccountContext from '../contexts/account-context';
import { AccountAndSet, ACCOUNT } from '../services/account.service';
import { CurrentPage } from '../services/page.service';
import Layout from '../components/layout/layout';
import MealCard from '../components/meal-card';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
});

const Index: FC = () => {
  const { account = ACCOUNT }: AccountAndSet = useContext(AccountContext);
  const classes = useStyles();

  return (
    <Layout currentPage={CurrentPage.HOME} pageName="Menu">
      <Grid container spacing={4}>
        {account.meals.map((meal) => (
          <Grid item xs={12} sm={6} className={classes.card}>
            <MealCard meal={meal} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Index;
