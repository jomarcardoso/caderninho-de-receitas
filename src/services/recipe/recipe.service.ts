import sum from 'lodash/sum';
import { AminoAcids } from '../amino-acid';
import { FoodService } from '../food';
import IngredientService from '../ingredient/ingredient.service';
import { Ingredient } from '../ingredient/ingredient.types';
import { Minerals, MINERALS } from '../mineral';
import { VITAMINS, Vitamins } from '../vitamin';
import {
  ProcessedRecipe,
  Recipe,
  ProcessedRecipeStep,
  RecipeStep,
  PROCESSED_RECIPE,
  RECIPE,
  PROCESSED_RECIPE_STEP,
} from './recipe.types';
import { Firestore, doc, getDoc } from 'firebase/firestore';

export function calculateCalories(ingredients: Array<Ingredient> = []): number {
  return Number(
    ingredients
      .reduce((sum, ingredient) => {
        return sum + ingredient.calories;
      }, 0)
      .toFixed(0),
  );
}

export function calculateCarbohidrates(
  ingredients: Array<Ingredient> = [],
): number {
  return Number(
    ingredients
      .reduce((sum, ingredient) => {
        return sum + ingredient.carbohydrates;
      }, 0)
      .toFixed(0),
  );
}

export function calculateGI(ingredients: Array<Ingredient> = []): number {
  const total = ingredients.reduce((sum, ingredient) => {
    return sum + ingredient.food.gi;
  }, 0);

  return total / ingredients.length;
}

export function calculateGC(ingredients: Array<Ingredient> = []): number {
  const total = ingredients.reduce((sum, ingredient) => {
    return sum + ingredient.food.gl;
  }, 0);

  return total / ingredients.length;
}

export function calculateAcidification(
  ingredients: Array<Ingredient> = [],
): number {
  const total = ingredients.reduce((sum, ingredient) => {
    return sum + ingredient.food.acidification;
  }, 0);

  return total / ingredients.length;
}

export function formatStep(data: RecipeStep): ProcessedRecipeStep {
  let ingredients: Array<Ingredient> = [];

  if (data.ingredients) {
    ingredients = data.ingredients?.split('\n').map((text) => {
      return IngredientService.ingredientFromString(text);
    });
  }

  return {
    name: data?.name ?? PROCESSED_RECIPE_STEP.name,
    ingredients: ingredients ?? PROCESSED_RECIPE_STEP.ingredients,
    preparation: data?.preparation ?? PROCESSED_RECIPE_STEP.preparation,
    additional: data?.additional ?? PROCESSED_RECIPE_STEP.additional,
  };
}

export function format(recipe = RECIPE): ProcessedRecipe {
  const steps =
    recipe?.steps?.map((partData) => formatStep(partData)) ??
    PROCESSED_RECIPE.steps;

  const allIngredients = steps.flatMap(({ ingredients }) => {
    return ingredients;
  });

  const allAminoAcids: AminoAcids = {
    alanine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.alanine + sum,
      0,
    ),
    arginine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.arginine + sum,
      0,
    ),
    asparticAcid: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.asparticAcid + sum,
      0,
    ),
    cystine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.cystine + sum,
      0,
    ),
    glutamicAcid: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.glutamicAcid + sum,
      0,
    ),
    glutamine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.glutamine + sum,
      0,
    ),
    glycine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.glycine + sum,
      0,
    ),
    histidine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.histidine + sum,
      0,
    ),
    isoleucine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.isoleucine + sum,
      0,
    ),
    leucine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.leucine + sum,
      0,
    ),
    lysine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.lysine + sum,
      0,
    ),
    methionine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.methionine + sum,
      0,
    ),
    phenylalanine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.phenylalanine + sum,
      0,
    ),
    proline: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.proline + sum,
      0,
    ),
    serine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.serine + sum,
      0,
    ),
    threonine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.threonine + sum,
      0,
    ),
    tryptophan: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.tryptophan + sum,
      0,
    ),
    tyrosine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.tyrosine + sum,
      0,
    ),
    valine: allIngredients.reduce(
      (sum, { aminoAcids }) => aminoAcids.valine + sum,
      0,
    ),
  };

  const {
    food: { image = '' },
  } = FoodService.getFoodByString(recipe.name, {
    preferRecipe: true,
  });

  const vitamins: Vitamins = allIngredients.reduce(
    (acc, ingredient): Vitamins => ({
      a: {
        ...ingredient.vitamins.a,
        quantity: acc.a.quantity + ingredient.vitamins.a.quantity,
      },
      b1: {
        ...ingredient.vitamins.b1,
        quantity: acc.b1.quantity + ingredient.vitamins.b1.quantity,
      },
      b2: {
        ...ingredient.vitamins.b2,
        quantity: acc.b2.quantity + ingredient.vitamins.b2.quantity,
      },
      b3: {
        ...ingredient.vitamins.b3,
        quantity: acc.b3.quantity + ingredient.vitamins.b3.quantity,
      },
      b5: {
        ...ingredient.vitamins.b5,
        quantity: acc.b5.quantity + ingredient.vitamins.b5.quantity,
      },
      b6: {
        ...ingredient.vitamins.b6,
        quantity: acc.b6.quantity + ingredient.vitamins.b6.quantity,
      },
      b7: {
        ...ingredient.vitamins.b7,
        quantity: acc.b7.quantity + ingredient.vitamins.b7.quantity,
      },
      b9: {
        ...ingredient.vitamins.b9,
        quantity: acc.b9.quantity + ingredient.vitamins.b9.quantity,
      },
      b11: {
        ...ingredient.vitamins.b11,
        quantity: acc.b11.quantity + ingredient.vitamins.b11.quantity,
      },
      b12: {
        ...ingredient.vitamins.b12,
        quantity: acc.b12.quantity + ingredient.vitamins.b12.quantity,
      },
      c: {
        ...ingredient.vitamins.c,
        quantity: acc.c.quantity + ingredient.vitamins.c.quantity,
      },
      d: {
        ...ingredient.vitamins.d,
        quantity: acc.d.quantity + ingredient.vitamins.d.quantity,
      },
      e: {
        ...ingredient.vitamins.e,
        quantity: acc.e.quantity + ingredient.vitamins.e.quantity,
      },
      alphaCarotene: {
        ...ingredient.vitamins.alphaCarotene,
        quantity:
          acc.alphaCarotene.quantity +
          ingredient.vitamins.alphaCarotene.quantity,
      },
      betaCarotene: {
        ...ingredient.vitamins.betaCarotene,
        quantity:
          acc.betaCarotene.quantity + ingredient.vitamins.betaCarotene.quantity,
      },
      cryptoxanthinCarotene: {
        ...ingredient.vitamins.cryptoxanthinCarotene,
        quantity:
          acc.cryptoxanthinCarotene.quantity +
          ingredient.vitamins.cryptoxanthinCarotene.quantity,
      },
      d2: {
        ...ingredient.vitamins.d2,
        quantity: acc.d2.quantity + ingredient.vitamins.d2.quantity,
      },
      d3: {
        ...ingredient.vitamins.d3,
        quantity: acc.d3.quantity + ingredient.vitamins.d3.quantity,
      },
      k: {
        ...ingredient.vitamins.k,
        quantity: acc.k.quantity + ingredient.vitamins.k.quantity,
      },
      lycopene: {
        ...ingredient.vitamins.lycopene,
        quantity: acc.lycopene.quantity + ingredient.vitamins.lycopene.quantity,
      },
      choline: {
        ...ingredient.vitamins.choline,
        quantity: acc.choline.quantity + ingredient.vitamins.choline.quantity,
      },
    }),
    VITAMINS,
  );

  const minerals: Minerals = allIngredients.reduce(
    (acc, ingredient): Minerals => ({
      calcium: {
        ...ingredient.minerals.calcium,
        quantity: acc.calcium.quantity + ingredient.minerals.calcium.quantity,
      },
      copper: {
        ...ingredient.minerals.copper,
        quantity: acc.copper.quantity + ingredient.minerals.copper.quantity,
      },
      iron: {
        ...ingredient.minerals.iron,
        quantity: acc.iron.quantity + ingredient.minerals.iron.quantity,
      },
      magnesium: {
        ...ingredient.minerals.magnesium,
        quantity:
          acc.magnesium.quantity + ingredient.minerals.magnesium.quantity,
      },
      manganese: {
        ...ingredient.minerals.manganese,
        quantity:
          acc.manganese.quantity + ingredient.minerals.manganese.quantity,
      },
      phosphorus: {
        ...ingredient.minerals.phosphorus,
        quantity:
          acc.phosphorus.quantity + ingredient.minerals.phosphorus.quantity,
      },
      fluoride: {
        ...ingredient.minerals.fluoride,
        quantity: acc.fluoride.quantity + ingredient.minerals.fluoride.quantity,
      },
      selenium: {
        ...ingredient.minerals.selenium,
        quantity: acc.selenium.quantity + ingredient.minerals.selenium.quantity,
      },
      sodium: {
        ...ingredient.minerals.sodium,
        quantity: acc.sodium.quantity + ingredient.minerals.sodium.quantity,
      },
      zinc: {
        ...ingredient.minerals.zinc,
        quantity: acc.zinc.quantity + ingredient.minerals.zinc.quantity,
      },
      potassium: {
        ...ingredient.minerals.potassium,
        quantity:
          acc.potassium.quantity + ingredient.minerals.potassium.quantity,
      },
    }),
    MINERALS,
  );

  return {
    ...recipe,
    id: recipe?.id ?? Math.round(Math.random() * 1000),
    steps,
    calories: calculateCalories(allIngredients),
    name: recipe.name,
    description: recipe?.description ?? '',
    additional: recipe?.additional ?? '',
    image,
    gi: calculateGI(allIngredients),
    acidification: calculateAcidification(allIngredients),
    gl: calculateGC(allIngredients),
    carbohydrates: calculateCarbohidrates(allIngredients),
    aminoAcids: allAminoAcids,
    category: recipe?.category ?? RECIPE.category,
    totalFat: sum(allIngredients.map((ingredient) => ingredient.totalFat)),
    dietaryFiber: sum(
      allIngredients.map((ingredient) => ingredient.dietaryFiber),
    ),
    proteins: sum(allIngredients.map((ingredient) => ingredient.proteins)),
    vitamins,
    minerals,
  };
}

function stepToText(step: RecipeStep): string {
  return `\
Ingredientes ${step.name}

${step.ingredients}

Modo de preparo ${step.name}

${step.name}`;
}

export function formatToText(recipe: Recipe): string {
  return `\
*${recipe.name.toUpperCase()}*

${recipe.description}

${recipe.steps.map(stepToText)}`;
}

export async function getRecipeByIdFromDB(
  recipeId = 0,
  db: Firestore,
): Promise<Recipe | null> {
  try {
    const docRef = doc(db, 'recipes', String(recipeId));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Recipe;

      return data;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}
