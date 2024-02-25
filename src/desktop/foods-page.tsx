import React, { FC, useState } from 'react';
import { Grid } from '@mui/material';
import FoodsPanel from '../panels/foods/foods';
import { FOOD } from '../services/food';
import FoodDetailed from '../components/food-detailed/food-detailed';

export const DesktopFoodsPage: FC = () => {
  const [currentFood, setCurrentFood] = useState(FOOD);
  const [currentFoodQuantity, setCurrentFoodQuantity] = useState(100);

  console.log(currentFood, currentFoodQuantity);

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        <FoodsPanel
          setCurrentFood={setCurrentFood}
          setCurrentFoodQuantity={setCurrentFoodQuantity}
          quantityToShow={20}
        />
      </Grid>

      <Grid item xs={12} md={7}>
        <div className="container" style={{ paddingTop: 40 }}>
          <FoodDetailed food={currentFood} />
        </div>
      </Grid>
    </Grid>
  );
};
