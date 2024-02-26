import React, { FC, useState } from 'react';
import FoodsPanel from '../panels/foods/foods';
import { FOOD } from '../services/food';
import FoodDetailed from '../components/food-detailed/food-detailed';

export const DesktopFoodsPage: FC = () => {
  const [currentFood, setCurrentFood] = useState(FOOD);
  const [currentFoodQuantity, setCurrentFoodQuantity] = useState(100);

  console.log(currentFoodQuantity);

  return (
    <div className="container">
      <div className="grid g-4">
        <div className="g-col-12 g-col-md-5">
          <FoodsPanel
            setCurrentFood={setCurrentFood}
            setCurrentFoodQuantity={setCurrentFoodQuantity}
            quantityToShow={20}
            currentFood={currentFood}
          />
        </div>

        <div className="g-col-12 g-col-md-7">
          <div style={{ paddingTop: 40 }}>
            <FoodDetailed food={currentFood} />
          </div>
        </div>
      </div>
    </div>
  );
};
