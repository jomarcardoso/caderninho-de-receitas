import { Food, FOOD, FoodData, PureFood } from './food.types';

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

function formatPure(data: FoodData): PureFood {
  return {
    acidification: data?.acidification ?? FOOD.acidification,
    aminoAcids: data?.aminoAcids ?? FOOD.aminoAcids,
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
    minerals: data?.minerals ?? FOOD.minerals,
    monounsaturatedFats: data?.monounsaturatedFats ?? FOOD.monounsaturatedFats,
    name: data?.name ?? FOOD.name,
    oneMeasures: data?.oneMeasures ?? FOOD.oneMeasures,
    proteins: data?.proteins ?? FOOD.proteins,
    saturedFats: data?.saturedFats ?? FOOD.saturedFats,
    sugar: data?.sugar ?? FOOD.sugar,
    totalFat: data?.totalFat ?? FOOD.totalFat,
    unitOfMeasurement: data?.unitOfMeasurement ?? FOOD.unitOfMeasurement,
    vitamins: data?.vitamins ?? FOOD.vitamins,
  };
}

export function format(data: FoodData): Food {
  return {
    ...formatPure(data),
    boiled: formatPure(data?.boiled ?? FOOD.boiled),
    flour: formatPure(data?.flour ?? FOOD.flour),
    juice: formatPure(data?.juice ?? FOOD.juice),
  };
}
