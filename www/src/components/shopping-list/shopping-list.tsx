import GrocerySvg from '../../assets/svg/history/grocery.svg';
import React, { FC } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { InteractiveField } from '../interactive-field/interactive-field';

export const ShoppingList: FC = () => {
  return (
    <div
      className="grid mt-5 pb-5"
      ovo-scrollspy-content="2"
      id="lista-de-compras"
    >
      <div className="g-col-12">
        <InteractiveField
          label={
            <>
              lista de compras
              <span className="svg-icon">
                <IoCartOutline />
              </span>
            </>
          }
          name="shopping-list"
          // value={shoppingList.text}
          // onChange={(event: ChangeEvent<HTMLInputElement>) =>
          //   setShoppingList(event.target.value)
          // }
        />

        <GrocerySvg style={{ mixBlendMode: 'multiply' }} />
      </div>
    </div>
  );
};
