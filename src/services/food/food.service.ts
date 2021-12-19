import {
  AminoAcidsData,
  AminoAcids,
  AMINO_ACIDS,
} from '../amino-acid/amino-acid.constants';
import { MineralService } from '../mineral';
import { VitaminService } from '../vitamin';
import { Food, FOOD, FoodData } from './food.types';

interface GetFoodByStringArgs {
  text: string;
  foods: Array<Food>;
}

interface GetFoodByStringReturn {
  food: Food;
  index: number;
}

type GetFoodByString = (args: GetFoodByStringArgs) => GetFoodByStringReturn;

export const getFoodByString: GetFoodByString = ({ foods = [], text = '' }) => {
  const lowerText = text.toLowerCase();
  // const textWords = lowerText.split(' ');

  if (lowerText.startsWith('sal para')) {
    return {
      food: foods.find((food) => food.name === 'Sal') ?? FOOD,
      index: 0,
    };
  }

  const foodsFound =
    foods.filter((foodItem) => {
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

export function formatAminoAcids(data?: AminoAcidsData): AminoAcids {
  return Object.keys(AMINO_ACIDS).reduce((object, key) => {
    const vitaminKey = key as keyof AminoAcids;

    return {
      ...object,
      [key]: data?.[vitaminKey] ?? AMINO_ACIDS[vitaminKey],
    };
  }, {}) as AminoAcids;
}

export function format(data?: FoodData): Food {
  return {
    acidification: data?.acidification ?? FOOD.acidification,
    aminoAcids: formatAminoAcids(data?.aminoAcids),
    calories: data?.calories ?? FOOD.calories,
    carbohydrates: data?.carbohydrates ?? FOOD.carbohydrates,
    description: data?.description ?? FOOD.description,
    dietaryFiber: data?.dietaryFiber ?? FOOD.dietaryFiber,
    enName: data?.enName ?? FOOD.enName,
    gi: data?.gi ?? FOOD.gi,
    gl: data?.gl ?? FOOD.gl,
    id: data?.id ?? FOOD.id,
    image: data?.image ?? FOOD.image,
    icon: data?.icon ?? FOOD.icon,
    keys: data?.keys ?? FOOD.keys,
    monounsaturatedFats: data?.monounsaturatedFats ?? FOOD.monounsaturatedFats,
    name: data?.name ?? FOOD.name,
    oneMeasures: data?.oneMeasures ?? FOOD.oneMeasures,
    proteins: data?.proteins ?? FOOD.proteins,
    saturedFats: data?.saturedFats ?? FOOD.saturedFats,
    sugar: data?.sugar ?? FOOD.sugar,
    totalFat: data?.totalFat ?? FOOD.totalFat,
    unitOfMeasurement: data?.unitOfMeasurement ?? FOOD.unitOfMeasurement,
    minerals: MineralService.format(data?.minerals),
    vitamins: VitaminService.format(data?.vitamins),
    version: data?.version ?? FOOD.version,
    rawId: data?.id ?? FOOD.rawId,
    cholesterol: data?.cholesterol ?? FOOD.cholesterol,
    recipe: data?.recipe ?? FOOD.recipe,
  };
}
