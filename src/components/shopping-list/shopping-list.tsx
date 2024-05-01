import GrocerySvg from '../../assets/svg/history/grocery.svg';
import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { InteractiveField } from '../interactive-field/interactive-field';
import { ShoppingListContext } from '../../providers';

export const ShoppingList: FC = () => {
  const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
  const [value, setValue] = useState(shoppingList);

  const handleChange = useCallback<
    ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >(
    (event) => {
      console.log(event.target.value, value);

      setValue(event.target.value);
    },
    [setValue],
  );

  const handleBlur = useCallback<
    FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >(
    (event) => {
      setShoppingList?.(event.target.value);
    },
    [setShoppingList],
  );

  useEffect(() => {
    setValue(shoppingList);
  }, [shoppingList]);

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
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
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
