import { Food, FOOD } from './food.types';

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
