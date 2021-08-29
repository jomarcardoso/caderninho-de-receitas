import { MineralService } from '../mineral';
import { VitaminService } from '../vitamin';
import {
  AminoAcids,
  AMINO_ACIDS,
  Food,
  FOOD,
  FoodData,
  AminoAcidsData,
} from './food.types';

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
  let exactFood = FOOD;
  const lowerText = text.toLowerCase();
  const textWords = lowerText.split(' ');

  const foodsFound =
    foods.filter((foodItem) => {
      const lowerFood = foodItem.name.toLowerCase();

      if (lowerFood === lowerText) {
        exactFood = foodItem;

        return true;
      }

      const foundOnTheName = lowerText.includes(lowerFood);

      if (foundOnTheName) return true;

      const founded = foodItem.keys.find((key) => {
        return lowerText.includes(key);
      });

      return founded;
    }) || [];

  if (exactFood.name) {
    return {
      food: exactFood,
      index: 0,
    };
  }

  const food = foodsFound.reduce((previous, current) => {
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
      index = lowerText.indexOf(key);
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
