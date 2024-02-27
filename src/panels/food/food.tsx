import React, { FC, LegacyRef, forwardRef } from 'react';
import { Food } from '../../services/food';
import Layout, { LayoutProps } from '../../components/layout/layout';
import FoodDetailed from '../../components/food-detailed/food-detailed';
import { HeaderProps } from '../../components/header/header';
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
      <Layout
        ref={ref as LegacyRef<HTMLDivElement>}
        className="food-panel"
        showFooter={false}
        mainProps={{
          style: { marginTop: 0 },
          containerProps: { style: { paddingLeft: 0, paddingRight: 0 } },
        }}
        headerProps={{
          ...headerProps,
          pageName: `${name} (${quantity}${
            food.type === 'liquid' || food.type === 'oil' ? 'ml' : 'g'
          })`,
        }}
        {...props}
      >
        <FoodDetailed food={food} />
      </Layout>
    );
  },
);

export default FoodPanel;
