import React, { FC, HTMLProps, useContext } from 'react';
import { useSharedRecipe } from '../../hooks/use-shared-recipe';
import RecipeContainer from '../recipe-container/recipe-container';
import { Recipe } from '../../services/recipe';
import Dialog from '../dialog/dialog';
import { Button } from '../button';
import SubmitComponent from '../submit';
import './dialog-shared-recipe.scss';
import { useData } from '../../providers';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from '../../services/language/language.service';

export const DialogSharedRecipe: FC<HTMLProps<HTMLDivElement>> = () => {
  const { sharedRecipe, setSharedRecipe } = useSharedRecipe();
  const { saveRecipe: addRecipe } = useData();
  const { language } = useContext(LanguageContext);

  return (
    <Dialog
      className="shared-recipe"
      actions={
        <div className="shared-recipe-actions">
          <div className="grid g-2">
            <p className="g-col-12 m-2">
              {translate('sharedRecipeMessage', language)}
            </p>

            <div className="g-col-4">
              <Button
                fullWidth
                variant="secondary"
                onClick={() => setSharedRecipe(null)}
              >
                {translate('cancel', language)}
              </Button>
            </div>
            <div className="g-col-8">
              <SubmitComponent
                onClick={() => {
                  addRecipe(sharedRecipe as Recipe);
                  setSharedRecipe(null);
                }}
              >
                {translate('save', language)}
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
        <RecipeContainer recipe={sharedRecipe as Recipe} />
      </div>
    </Dialog>
  );
};
