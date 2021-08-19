import React, { FC } from 'react';
import { Food } from '../services/food';
import Page from '../components/page/page';
import FoodPanel from '../panels/food';

interface Props {
  pageContext: Food;
}

const FoodPage: FC<Props> = ({ pageContext: food }) => {
  return (
    <Page>
      <FoodPanel food={food} />
    </Page>
  );
};

export default FoodPage;
