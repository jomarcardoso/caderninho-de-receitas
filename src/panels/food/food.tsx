import React, { FC, LegacyRef, forwardRef } from 'react';
import { Food } from '../../services/food';
import Layout, { LayoutProps } from '../../components/layout/layout';
import FoodDetailed from '../../components/food-detailed/food-detailed';
import Header, { HeaderProps } from '../../components/header/header';
import './food.scss';

interface Props extends LayoutProps {
  food: Food;
  quantity?: number;
  headerProps?: HeaderProps;
}

const FoodPanel: FC<Props> = forwardRef(
  ({ food, quantity = 100, headerProps, ...props }, ref) => {
    const { name = '' } = food;

    return (
      <div>
        <Header
          pageName={`${name} (${quantity}${
            food.type === 'liquid' || food.type === 'oil' ? 'ml' : 'g'
          })`}
          {...headerProps}
        />
        <Layout
          ref={ref as LegacyRef<HTMLDivElement>}
          className="food"
          showFooter={false}
          mainProps={{
            style: { marginTop: 0 },
          }}
          {...props}
        >
          <FoodDetailed food={food} />
        </Layout>
      </div>
    );
  },
);

export default FoodPanel;
