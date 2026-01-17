import React, {
  ChangeEventHandler,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Field, { FieldProps } from '../field/field';
import './interactive-field.scss';
import Image from '../image/image';
import { Checkbox } from '../checkbox';
import { ShoppingList } from '../../providers/shopping-list/shopping-list.types';
import { ShoppingListService } from '../../providers/shopping-list/shopping-list.service';
import { ShoppingListContext } from '../../providers';

export const InteractiveField: FC<FieldProps> = ({ ...props }) => {
  const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
  const initialData = useMemo(() => {
    return ShoppingListService.format(String(shoppingList));
  }, [shoppingList]);

  const [text, setText] = useState(initialData.text);
  const [checks, setChecks] = useState(initialData.list.map((a) => a.checked));
  const formattedShoppingList = useMemo(() => {
    return ShoppingListService.format(text);
  }, [text]);

  const save = useCallback(
    (newValue = '') => {
      setShoppingList?.(newValue);
    },
    [setShoppingList],
  );

  const handleBlur = useCallback(() => {
    const toEmit = ShoppingListService.unprocess(text, checks);

    save(toEmit);
  }, [save]);

  const handleChange = useCallback<
    ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >(
    (event) => {
      setText(event.target.value);
    },
    [setText],
  );

  const handleCheck = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const { value, checked } = event.target;
      const copyList = [...checks];

      checks[Number(value)] = checked;

      const toEmit = ShoppingListService.unprocess(text, copyList);

      setChecks(copyList);
      save(toEmit);
    },
    [setText, save],
  );

  useEffect(() => {
    if (text !== initialData.text) {
      setText(initialData.text);
    }

    if (initialData.list.some((a, i) => a.checked !== checks[i])) {
      setChecks(initialData.list.map((a) => a.checked));
    }
  }, [shoppingList]);

  return (
    <div className="interactive-field">
      <div className="interactive-field__foods">
        {formattedShoppingList.list.map(
          (line) =>
            line.food.name && (
              <Image
                src={line.food.icon || line.food.image}
                alt={line.food.name}
                transparent
                className="interactive-field__img"
              />
            ),
        )}
      </div>

      <Field
        size="large"
        multiline
        minRows="4"
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />

      <div className="interactive-field__checks">
        {checks.map((line, i) => (
          <Checkbox value={i} checked={line} onChange={handleCheck} />
        ))}
      </div>
    </div>
  );
};
