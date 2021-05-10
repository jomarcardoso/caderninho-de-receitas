import React, { FC, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '../components/button/button';
import { Food, FoodVersion } from '../services/food';
import Layout from '../components/layout/layout';
import FoodDetailed from '../components/food-detailed/food-detailed';

interface Props {
  pageContext: Food;
}

const FoodPage: FC<Props> = ({ pageContext: food }) => {
  const [version, setVersion] = useState<FoodVersion>('RAW');
  const { name = '' } = food;

  return (
    <Layout pageName={name}>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant={version === 'RAW' ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => setVersion('RAW')}
              >
                cru
              </Button>
            </Grid>
            {/* {food?.juice?.name && (
              <Grid item>
                <Button
                  variant={version === 'JUICE' ? 'contained' : 'outlined'}
                  onClick={() => setVersion('JUICE')}
                  color="secondary"
                >
                  suco
                </Button>
              </Grid>
            )} */}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FoodDetailed food={food} version={version} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FoodPage;
