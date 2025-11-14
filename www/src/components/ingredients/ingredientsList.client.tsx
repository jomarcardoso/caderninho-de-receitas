'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Ingredient } from 'services/ingredient/ingredient.model';
import type { Food } from 'services/food/food.model';
import { Image2 } from '../image-2/image';
import { hasKeeperPermission } from '@/services/auth/auth.service';

export default function IngredientsList({
  ingredients,
  language,
  setCurrentFood,
  setCurrentFoodQuantity,
}: {
  ingredients: Ingredient[];
  language: string;
  setCurrentFood?: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isKeeper, setIsKeeper] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    hasKeeperPermission()
      .then((v) => active && setIsKeeper(v))
      .catch(() => active && setIsKeeper(false));
    return () => { active = false; };
  }, []);

  const items = useMemo(() => ingredients, [ingredients]);

  const handleClick = (ingredient: Ingredient) => {
    if (!isKeeper) return;
    // if (setCurrentFood) setCurrentFood(ingredient.food);
    // if (setCurrentFoodQuantity) setCurrentFoodQuantity(ingredient.quantity);
  };

  return (
    <ul className="list">
      {items.map((ingredient) => (
        <li
          key={`${ingredient.food.id}-${ingredient.quantity}-${ingredient.text.replace(/\s/g, '-')}`}
        >
          {isKeeper ? (
            <button
              className="list-item -no-gutters -no-border"
              // onClick={() => handleClick(ingredient)}
            >
              <div className="w-100 grid columns-10 align-items-center g-2">
                <div className="g-col-1">
                  <Image2
                    srcs={[
                      ingredient.food.icon,
                      ...(ingredient.food.imgs ?? []),
                    ] as string[]}
                    alt={ingredient.food.name[language as 'pt' | 'en']}
                    transparent
                  />
                </div>

                <div className="g-col-9">
                  <p>{ingredient.text}</p>
                </div>
              </div>
            </button>
          ) : (
            <div className="list-item -no-gutters -no-border">
              <div className="w-100 grid columns-10 align-items-center g-2">
                <div className="g-col-1">
                  <Image2
                    srcs={[
                      ingredient.food.icon,
                      ...(ingredient.food.imgs ?? []),
                    ] as string[]}
                    alt={ingredient.food.name[language as 'pt' | 'en']}
                    transparent
                  />
                </div>

                <div className="g-col-9">
                  <p>{ingredient.text}</p>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

