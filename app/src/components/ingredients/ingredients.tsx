import { type FC, useContext, useEffect, useMemo, useState } from 'react';
import Image from '../image/image';
import { SemanticButton } from '../semantic-button';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import type { Ingredient } from 'services/ingredient/ingredient.model';
import type { Food } from 'services/food/food.model';
import { Section, type SectionProps } from 'notebook-layout';
import { getFoodIconsMapById, type FoodIconByIdEntry } from '../../services/icons.api';

interface Props {
  ingredients: Array<Ingredient>;
  setCurrentFood?: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

export type IngredientsProps = Props & SectionProps;

const Ingredients: FC<IngredientsProps> = ({
  ingredients = [],
  setCurrentFood,
  setCurrentFoodQuantity,
  ...props
}) => {
  const { language } = useContext(LanguageContext);
  const [iconMap, setIconMap] = useState<Record<number, string>>({});

  function toDataUrl(entry: FoodIconByIdEntry | undefined): string | undefined {
    if (!entry || !entry.content) return undefined;
    const media = (entry.mediaType || '').toLowerCase();
    const isSvg = media.includes('svg') || entry.content.trim().startsWith('<');
    return isSvg
      ? `data:image/svg+xml;utf8,${encodeURIComponent(entry.content)}`
      : `data:${entry.mediaType || 'image/png'};base64,${entry.content}`;
  }

  const iconIds = useMemo(() => Array.from(new Set((ingredients || [])
    .map(i => (i.food as any).iconId)
    .filter((n: any) => typeof n === 'number' && n > 0))), [ingredients]);

  useEffect(() => {
    if (!iconIds.length) return;
    (async () => {
      try {
        const map = await getFoodIconsMapById(iconIds);
        const urls: Record<number, string> = {};
        for (const k of Object.keys(map)) {
          const id = Number(k);
          const url = toDataUrl(map[id]);
          if (id > 0 && url) urls[id] = url;
        }
        setIconMap(urls);
      } catch {}
    })();
  }, [iconIds]);
  function handleClick(ingredient: Ingredient) {
    if (setCurrentFood) {
      setCurrentFood(ingredient.food);
    }

    if (setCurrentFoodQuantity) {
      setCurrentFoodQuantity(ingredient.quantity);
    }
  }

  console.log(ingredients);

  return (
    <Section
      title={translate('ingredientsTitle', language)}
      onBgWhite
      {...props}
    >
      <div className="list">
        {ingredients.map((ingredient) => (
          <SemanticButton
            key={`${ingredient.food.id}-${
              ingredient.quantity
            }-${ingredient.text.replace(/\s/g, '-')}`}
            className="list-item -no-gutters -no-border"
            onClick={() => handleClick(ingredient)}
          >
            <div className="w-100 grid columns-10 align-items-center g-2">
              <div className="g-col-1">
                <Image
                  srcs={[
                    iconMap[(ingredient.food as any).iconId as any] || ingredient.food.icon,
                    ...(ingredient.food.imgs ?? []),
                  ].filter(Boolean) as string[]}
                  alt={ingredient.food.name[language]}
                  transparent
                />
              </div>

              <div className="g-col-9">
                <p>{ingredient.text}</p>
              </div>
            </div>
          </SemanticButton>
        ))}
      </div>
    </Section>
  );
};

export default Ingredients;

