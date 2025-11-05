'use client';
import { useContext } from 'react';
import CurrentRecipeContext from '../../providers/current-recipe/current-recipe.context';
import { KitchenPageView } from './page.view';

const RecipePanel = () => {
  const { currentRecipeDto } = useContext(CurrentRecipeContext);

  return <KitchenPageView recipeToEdit={currentRecipeDto} />;
};

export default RecipePanel;
