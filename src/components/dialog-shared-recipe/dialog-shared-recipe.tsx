import React, { FC, HTMLProps, useContext } from 'react';
import { Modal } from '@mui/base/Modal';
import FirebaseContext from '../../contexts/firebase-context';
import { useSharedRecipe } from '../../hooks/use-shared-recipe';
import RecipeContainer from '../recipe-container/recipe-container';
import { Recipe } from '../../services/recipe';
import Dialog from '../dialog/dialog';
import { Button } from '../button';
import SubmitComponent from '../submit';
import './dialog-shared-recipe.scss';
import useRecipes from '../../hooks/use-recipes';
import useFoods from '../../hooks/use-food';

export const DialogSharedRecipe: FC<HTMLProps<HTMLDivElement>> = () => {
  const firebase = useContext(FirebaseContext);
  const { sharedRecipe, setSharedRecipe } = useSharedRecipe(firebase);
  const foods = useFoods();
  const { addRecipe } = useRecipes(foods, firebase);

  return (
    <Dialog
      className="shared-recipe"
      actions={
        <div className="shared-recipe-actions">
          <div className="grid g-2">
            <p className="g-col-12 m-2">
              Clique em salvar se quiser adicionar essa receita ao seu
              caderninho.
            </p>

            <div className="g-col-4">
              <Button
                fullWidth
                variant="secondary"
                onClick={() => setSharedRecipe(null)}
              >
                cancelar
              </Button>
            </div>
            <div className="g-col-8">
              <SubmitComponent
                onClick={() => {
                  addRecipe(sharedRecipe as Recipe);
                  setSharedRecipe(null);
                }}
              >
                salvar
              </SubmitComponent>
            </div>
          </div>
        </div>
      }
      open={!!sharedRecipe}
      noPadding
      dense
    >
      <div className="dialog">
        <RecipeContainer compact recipe={sharedRecipe as Recipe} />
      </div>
    </Dialog>
  );
};
