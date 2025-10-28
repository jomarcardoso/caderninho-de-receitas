import {
  ChangeEventHandler,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Field, FieldProps } from 'notebook-layout';
import './interactive-field.scss';
import Image from '../image/image';
import { Checkbox } from 'notebook-layout';
import { ShoppingListService } from '../../providers/shopping-list/shopping-list.service';
import { ShoppingListContext } from '../../providers';
import { FoodsContext } from '../../providers/foods.provider';
import { LanguageContext } from '../../providers/language/language.context';
import { getFoodIconsMapById, type FoodIconByIdEntry } from '../../services/icons.api';

export const InteractiveField: FC<FieldProps> = ({ ...props }) => {
  const { language } = useContext(LanguageContext);
  const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
  const { foods } = useContext(FoodsContext);
  const initialData = useMemo(() => {
    return ShoppingListService.format(foods, String(shoppingList));
  }, [shoppingList]);

  const [text, setText] = useState(initialData.text);
  const [checks, setChecks] = useState(initialData.list.map((a) => a.checked));
  const formattedShoppingList = useMemo(() => {
    return ShoppingListService.format(foods, text);
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

  const [iconMap, setIconMap] = useState<Record<number, string>>({});
  function toDataUrl(entry: FoodIconByIdEntry | undefined): string | undefined {
    if (!entry || !entry.content) return undefined;
    const media = (entry.mediaType || '').toLowerCase();
    const isSvg = media.includes('svg') || entry.content.trim().startsWith('<');
    return isSvg
      ? `data:image/svg+xml;utf8,${encodeURIComponent(entry.content)}`
      : `data:${entry.mediaType || 'image/png'};base64,${entry.content}`;
  }

  useEffect(() => {
    const ids = Array.from(new Set((formattedShoppingList.list || [])
      .map((l: any) => (l.food as any)?.iconId)
      .filter((n: any) => typeof n === 'number' && n > 0)));
    if (!ids.length) return;
    (async () => {
      try {
        const map = await getFoodIconsMapById(ids);
        const urls: Record<number, string> = {};
        for (const k of Object.keys(map)) {
          const id = Number(k);
          const url = toDataUrl(map[id]);
          if (id > 0 && url) urls[id] = url;
        }
        setIconMap(urls);
      } catch {}
    })();
  }, [formattedShoppingList]);

  return (
    <div className="interactive-field">
      <div className="interactive-field__foods">
        {formattedShoppingList.list.map(
          (line) =>
            line.food.name && (
              <Image
                srcs={[
                  iconMap[(line.food as any).iconId as any] || line.food.icon,
                  ...(line.food.imgs ?? []),
                ].filter(Boolean) as string[]}
                alt={line.food.name[language]}
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
