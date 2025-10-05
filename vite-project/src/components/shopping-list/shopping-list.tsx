import GrocerySvg from 'images/svg/history/grocery.svg?react';
import { type FC, useContext } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { InteractiveField } from '../interactive-field/interactive-field';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from '../../services/language/language.service';

export const ShoppingList: FC = () => {
  const { language } = useContext(LanguageContext);

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
              {translate('shoppingListLabel', language)}
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
