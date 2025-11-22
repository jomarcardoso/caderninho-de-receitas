'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Ingredient } from 'services/ingredient/ingredient.model';
import type { Food } from 'services/food/food.model';
import { Image2 } from '../image-2/image';
import { hasKeeperPermission } from '@/services/auth/auth.service';
import { Language } from '@/contexts/language';

export default function IngredientsList({
  ingredients,
  language,
  setCurrentFood,
  setCurrentFoodQuantity,
}: {
  ingredients: Ingredient[];
  language: Language;
  setCurrentFood?: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isKeeper, setIsKeeper] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    hasKeeperPermission()
      .then((v) => active && setIsKeeper(v))
      .catch(() => active && setIsKeeper(false));
    return () => {
      active = false;
    };
  }, []);

  const items = useMemo(() => ingredients, [ingredients]);

  const handleClick = (ingredient: Ingredient) => {
    if (!isKeeper) return;
    // if (setCurrentFood) setCurrentFood(ingredient.food);
    // if (setCurrentFoodQuantity) setCurrentFoodQuantity(ingredient.quantity);
  };

  function renderTemplate(ingredient: Ingredient) {
    return (
      <div className="w-100 grid columns-10 align-items-center g-2">
        <div className="g-col-1">
          <Image2
            srcs={
              [
                ingredient.food.icon,
                ...(ingredient.food.imgs ?? []),
              ] as string[]
            }
            alt={ingredient.food.name[language as 'pt' | 'en']}
            transparent
          />
        </div>

        <div className="g-col-9" style={{ lineHeight: 1.2 }}>
          <p>{ingredient.text}</p>
          <p>
            <small>{ingredient.quantity}</small>
            {typeof ingredient?.quantity === 'number' && ingredient?.food ? (
              <>
                {(() => {
                  try {
                    const t = (
                      ingredient.food.type?.en ||
                      ingredient.food.type?.pt ||
                      ''
                    )
                      .toString()
                      .toLowerCase();
                    return t.includes('liquid') ||
                      t.includes('líquido') ||
                      t.includes('oil') ||
                      t.includes('óleo')
                      ? 'ml'
                      : 'g';
                  } catch {
                    return 'g';
                  }
                })()}
              </>
            ) : null}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="list">
      {items.map((ingredient) => (
        <li
          key={`${ingredient.food.id}-${
            ingredient.quantity
          }-${ingredient.text.replace(/\s/g, '-')}`}
        >
          {isKeeper ? (
            <button
              className="list-item -no-gutters -no-border"
              // onClick={() => handleClick(ingredient)}
            >
              {renderTemplate(ingredient)}
            </button>
          ) : (
            <div className="list-item -no-gutters -no-border">
              {renderTemplate(ingredient)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
