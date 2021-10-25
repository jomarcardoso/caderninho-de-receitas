import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import { Food } from '../services/food';
import Layout from '../components/layout/layout';
import FoodDetailed from '../components/food-detailed/food-detailed';
import { HeaderProps } from '../components/header';

interface Props {
  food: Food;
  quantity?: number;
  headerProps?: HeaderProps;
}

const FoodPanel: FC<Props> = ({ food, quantity = 100, headerProps }) => {
  const { name = '' } = food;

  return (
    <Layout
      showFooter={false}
      mainProps={{ mt: 0 }}
      headerProps={{
        ...headerProps,
        pageName: `${name} (${quantity}g)`,
        theme: 'dark',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <FoodDetailed food={food} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FoodPanel;
