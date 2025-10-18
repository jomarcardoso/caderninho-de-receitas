"use client";

import { useLanguage } from '@/contexts/language';
import type { Recipe } from '@common/services/recipe/recipe.model';
import type { Food } from '@common/services/food/food.model';
import type { Nutrient } from '@common/services/nutrient/nutrient.model';
import type { RecipeStep } from '@common/services/recipe-step';
import { RecipeDetails } from '@common/components';
import { translate } from '@common/services/language/language.service';
import { formatNumber, roundToMaximumDecimals } from '@common/services/number';
import { SectionCard, Section } from 'notebook-layout';
import { useMemo } from 'react';
import {
  VITAMINS_FALLBACK,
  MINERALS_FALLBACK,
  AMINO_ACIDS_FALLBACK,
  NUTRITIONAL_INFO_FALLBACK,
  mapRecordToNutrients,
} from '@common/services/nutrient/fallback';

type IngredientsProps = {
  ingredients: RecipeStep['ingredients'];
  setCurrentFood?: (food: Food) => void;
  setCurrentFoodQuantity?: (quantity: number) => void;
};

const Ingredients = ({
  ingredients,
  setCurrentFood,
  setCurrentFoodQuantity,
}: IngredientsProps) => {
  const { language } = useLanguage();

  const handleClick = (ing: RecipeStep['ingredients'][number]) => {
    if (setCurrentFood) setCurrentFood(ing.food);
    if (setCurrentFoodQuantity) setCurrentFoodQuantity(ing.quantity);
  };

  return (
    <Section onBgWhite title={translate('ingredientsTitle', language)}>
      <ul className="list">
        {ingredients.map((ing) => (
          <li
            key={`${ing.food.id}-${ing.quantity}-${ing.text.replace(/\s/g, '-')}`}
            onClick={() => handleClick(ing)}
            style={{ cursor: setCurrentFood || setCurrentFoodQuantity ? 'pointer' : 'default' }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {ing.food?.icon || (ing.food as any)?.imgs?.[0] ? (
                <img
                  src={ing.food.icon || (ing.food as any).imgs?.[0]}
                  alt=""
                  style={{ width: 24, height: 24, objectFit: 'contain' }}
                />
              ) : null}
              <span>{ing.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
};

const Preparation = ({
  preparation,
  title,
}: {
  preparation: string;
  title?: string;
}) => {
  const { language } = useLanguage();
  const sectionTitle = title ?? translate('preparationTitle', language);
  if (!preparation) return null;

  const lines = preparation.split(/\n\s*/).filter(Boolean);

  return (
    <Section onBgWhite title={sectionTitle}>
      <div className="grid g-2 columns-1">
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </Section>
  );
};

const NutrientDisplay = ({ nutrient }: { nutrient: Nutrient }) => {
  if (!nutrient.quantity) return null;
  const { language } = useLanguage();
  const rounded = roundToMaximumDecimals(nutrient.quantity);
  const formatted = formatNumber(rounded ?? nutrient.quantity, language);
  if (!formatted) return null;

  return (
    <div className="d-flex gap-1 justify-content-between">
      <div>{nutrient.shortName ?? nutrient.name[language]}</div>
      <span style={{ whiteSpace: 'nowrap' }}>
        {formatted}
        {nutrient.measurementUnit}
      </span>
    </div>
  );
};

const ListItem = ({
  children,
  noGutters,
  noBorder,
}: {
  children: React.ReactNode;
  noGutters?: boolean;
  noBorder?: boolean;
}) => (
  <li className={[noGutters ? '-no-gutters' : '', noBorder ? '-no-border' : ''].filter(Boolean).join(' ')}>
    {children}
  </li>
);

const AminoAcidsTable = ({
  essentialAminoAcids = [],
  contrast,
}: {
  contrast?: 'light' | 'dark';
  essentialAminoAcids: Nutrient[];
}) => {
  const { language } = useLanguage();
  if (!essentialAminoAcids.length) return null;

  const max = essentialAminoAcids.reduce((m, n) => Math.max(m, n.quantity || 0), 0);

  const classes = [
    'aminoacids-table',
    'table',
    contrast === 'light' ? 'aminoacids-table--on-light' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`table-container ${contrast === 'light' ? 'table-container--light' : ''}`}>
      <table className={classes}>
        <caption className="table__caption">
          {translate('aminoAcidsTableTitle', language)}
        </caption>
        <thead>
          <tr className="table__tr">
            <th className="table__th aminoacids-table__name">
              {translate('aminoAcidsFoodColumn', language)}
            </th>
            <th align="center" className="table__th">1</th>
            <th align="center" className="table__th">2</th>
            <th align="center" className="table__th">3</th>
            <th align="center" className="table__th">4</th>
          </tr>
        </thead>
        <tbody>
          {essentialAminoAcids.map(({ quantity = 0, name }) => {
            const veryLow = quantity >= max / 5;
            const low = quantity >= (max / 5) * 2;
            const regular = quantity >= (max / 5) * 3;
            const high = quantity >= (max / 5) * 4;

            return (
              <tr className="table__tr" key={name[language]}>
                <td className="table__td">{name[language]}</td>
                <td className="table__td aminoacids-table__cell" align="right">
                  {veryLow ? (
                    <div className="aminoacids-table__bar aminoacids-table__bar--filled" />
                  ) : (
                    <div className="aminoacids-table__bar" />
                  )}
                </td>
                <td className="table__td aminoacids-table__cell" align="right">
                  {low ? (
                    <div className="aminoacids-table__bar aminoacids-table__bar--filled" />
                  ) : (
                    <div className="aminoacids-table__bar" />
                  )}
                </td>
                <td className="table__td aminoacids-table__cell" align="right">
                  {regular ? (
                    <div className="aminoacids-table__bar aminoacids-table__bar--filled" />
                  ) : (
                    <div className="aminoacids-table__bar" />
                  )}
                </td>
                <td className="table__td aminoacids-table__cell" align="right">
                  {high ? (
                    <div className="aminoacids-table__bar aminoacids-table__bar--filled" />
                  ) : (
                    <div className="aminoacids-table__bar" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

type ClientProps = { recipe: Recipe; foodIcons?: Record<string, string> };

function buildIconsIndex(dict?: Record<string, string>): Record<string, string> {
  if (!dict) return {};
  const idx: Record<string, string> = {};
  for (const [k, v] of Object.entries(dict)) {
    idx[k] = v;
    idx[k.toLowerCase()] = v;
  }
  return idx;
}

export default function ClientRecipeDetails({ recipe, foodIcons }: ClientProps) {
  const { language } = useLanguage();
  const iconsIndex = useMemo(() => buildIconsIndex(foodIcons), [foodIcons]);

  const resolve = (name?: string): string => {
    if (!name) return '';
    const initial = name.trim();
    if (initial.startsWith('data:') || initial.startsWith('http')) return initial;
    const basename = initial.includes('/') ? initial.split('/').pop()! : initial;
    const keyL = basename.toLowerCase();
    const raw = iconsIndex[basename] ?? iconsIndex[initial] ?? iconsIndex[keyL];
    const ext = basename.toLowerCase();
    if (!raw) return basename ? `/images/food/${basename}` : '';
    if (ext.endsWith('.svg')) return `data:image/svg+xml;utf8,${encodeURIComponent(raw)}`;
    if (ext.endsWith('.png')) return `data:image/png;base64,${raw}`;
    if (ext.endsWith('.webp')) return `data:image/webp;base64,${raw}`;
    return raw;
  };

  const normalizedRecipe = useMemo(() => {
    const r: any = { ...recipe };
    // Resolve icons via dictionary when provided (public endpoint)
    if (r.food) {
      r.food = { ...r.food, icon: resolve(r.food.icon) };
    }
    if (Array.isArray(r.steps)) {
      r.steps = r.steps.map((s: any) => ({
        ...s,
        ingredients: (s.ingredients ?? []).map((ing: any) => ({
          ...ing,
          food: { ...ing.food, icon: resolve(ing.food?.icon) },
        })),
      }));
    }
    r.vitamins = mapRecordToNutrients(r.vitamins, VITAMINS_FALLBACK);
    if (!r.vitamins?.length && r.food?.vitamins) {
      r.vitamins = mapRecordToNutrients(r.food.vitamins, VITAMINS_FALLBACK);
    }

    r.minerals = mapRecordToNutrients(r.minerals, MINERALS_FALLBACK);
    if (!r.minerals?.length && r.food?.minerals) {
      r.minerals = mapRecordToNutrients(r.food.minerals, MINERALS_FALLBACK);
    }

    r.aminoAcids = mapRecordToNutrients(r.aminoAcids, AMINO_ACIDS_FALLBACK);
    if (!r.aminoAcids?.length && r.food?.aminoAcids) {
      r.aminoAcids = mapRecordToNutrients(r.food.aminoAcids, AMINO_ACIDS_FALLBACK);
    }
    r.essentialAminoAcids = Array.isArray(r.essentialAminoAcids)
      ? r.essentialAminoAcids
      : mapRecordToNutrients(r.essentialAminoAcids, AMINO_ACIDS_FALLBACK);
    r.nutritionalInformation = mapRecordToNutrients(r.nutritionalInformation, NUTRITIONAL_INFO_FALLBACK);
    if (!r.nutritionalInformation?.length && r.food?.nutritionalInformation) {
      r.nutritionalInformation = mapRecordToNutrients(r.food.nutritionalInformation, NUTRITIONAL_INFO_FALLBACK);
    }
    return r as Recipe;
  }, [recipe, foodIcons]);

  return (
    <RecipeDetails
      recipe={normalizedRecipe}
      language={language}
      components={{
        Ingredients,
        Preparation,
        NutrientDisplay,
        ListItem,
        AminoAcidsTable,
        SectionCard,
      }}
    />
  );
}
