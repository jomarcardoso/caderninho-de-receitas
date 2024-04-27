import { foods } from '../../db/food';
import { Food, FOOD } from './food.types';

interface GetFoodByStringReturn {
  food: Food;
  index: number;
}

type GetFoodByString = (
  text: string,
  options?: {
    preferRecipe?: true;
  },
) => GetFoodByStringReturn;

export const getFoodByString: GetFoodByString = (
  text = '',
  { preferRecipe } = {},
) => {
  const orderedFoods = foods.sort(({ recipe }) =>
    recipe ? (preferRecipe ? -1 : 1) : preferRecipe ? 1 : -1,
  );
  const lowerText = text.toLowerCase();

  if (lowerText.startsWith('sal para')) {
    return {
      food: orderedFoods.find((food) => food.name === 'Sal') ?? FOOD,
      index: 0,
    };
  }

  const foodsFound =
    orderedFoods.filter((foodItem) => {
      const lowerFood = foodItem.name.toLowerCase();

      if (lowerFood === lowerText) {
        return true;
      }

      const foundOnTheName = lowerText.includes(lowerFood);

      if (foundOnTheName) return true;

      const founded = foodItem.keys.find((key) => {
        const lowerKey = key.toLocaleLowerCase();

        return lowerText.includes(lowerKey);
      });

      return founded;
    }) || [];

  const exactFood = foodsFound.find((foodFound) => {
    const lowerFoodFound = foodFound.name.toLowerCase();

    return (
      lowerFoodFound === lowerText ||
      foodFound.keys.some((key) => key.toLowerCase() === lowerText)
    );
  });

  if (exactFood) {
    return {
      food: exactFood,
      index: 0,
    };
  }

  let { food } = foodsFound.reduce(
    (previousFood, currentFood) => {
      const currentCountLetters = currentFood.keys.reduce(
        (previousKey, currentKey) => {
          const lowerKey = currentKey.toLowerCase();
          const keyFound = lowerText.includes(lowerKey);

          if (keyFound) {
            const keyLength = lowerKey.length;

            if (keyLength > previousKey) {
              return keyLength;
            }
          }

          return previousKey;
        },
        0,
      );

      if (currentCountLetters > previousFood.length) {
        return {
          food: currentFood,
          length: currentCountLetters,
        };
      }

      return previousFood;
    },
    { food: FOOD, length: 0 },
  );

  if (!food.name) {
    food = foodsFound.reduce((previous, current) => {
      const textWords = lowerText.split(' ');
      const lowerPrevious = previous.name.toLowerCase();
      const lowerCurrent = current.name.toLowerCase();
      const previousWords = lowerPrevious.split(' ');
      const currentWords = lowerCurrent.split(' ');
      let previousWordsMatched = 0;
      let currentWordsMatched = 0;

      previousWords.forEach((previousWord) => {
        textWords.forEach((textWord) => {
          if (previousWord === textWord && textWord !== '')
            previousWordsMatched += 1;
        });
      });

      currentWords.forEach((currentWord) => {
        textWords.forEach((textWord) => {
          if (currentWord === textWord && textWord !== '')
            currentWordsMatched += 1;
        });
      });

      if (previousWordsMatched < currentWordsMatched) {
        return current;
      }

      if (previousWordsMatched === currentWordsMatched) {
        if (previous.name.length <= current.name.length) {
          if (previous.name) {
            return previous;
          }
        }

        return current;
      }

      return previous;
    }, FOOD);
  }

  if (!food.name) {
    return {
      food: FOOD,
      index: 0,
    };
  }

  let index = lowerText.indexOf(food.name);

  food.keys.forEach((key) => {
    if (index !== -1) return;

    if (lowerText.includes(key)) {
      const lowerKey = key.toLowerCase();

      index = lowerText.indexOf(lowerKey);
    }
  });

  return { food, index };
};
