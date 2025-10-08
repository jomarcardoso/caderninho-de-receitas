import { type FC, useCallback, useContext, useEffect } from 'react';
import {
  IoAddCircleOutline,
  IoCreateOutline,
  IoShareOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import Layout from '../../components/layout/layout';
import { DataContext } from '../../providers/data/data.context';
import RecipeRegister from '../../components/recipe-register/recipe-register';
import RecipeContainer from '../../components/recipe-container/recipe-container';
import { Panel } from '../../components/panel/panel';
import { LanguageContext } from '../../providers/language/language.context';
import LoadingContext from '../../providers/loading/loading.context';
import { EditingContext } from '../../providers/editing/editing.context';
import { ShareService } from 'services/url/share.service';
import CurrentRecipeContext from '../../providers/current-recipe/current-recipe.context';
import type { Food } from 'services/food/food.model';
import { mapRecipeModelToDto } from 'services/recipe/recipe.service';

let rendered = 0;

const RecipePanel: FC<{
  setCurrentFood(food: Food): void;
  setCurrentFoodQuantity(quantity: number): void;
}> = ({ setCurrentFood, setCurrentFoodQuantity }) => {
  const { currentRecipe, setCurrentRecipe } = useContext(CurrentRecipeContext);
  const { language } = useContext(LanguageContext);
  const { removeRecipe } = useContext(DataContext);
  const { setLoading } = useContext(LoadingContext);
  const { editing, setEditing } = useContext(EditingContext);
  const currentRecipeDto = currentRecipe && mapRecipeModelToDto(currentRecipe);

  async function handleShare() {
    if (setLoading) {
      setLoading(true);
    }

    if (!currentRecipe) {
      return;
    }

    await ShareService.shareRecipe(currentRecipe, language);

    if (setLoading) {
      setLoading(false);
    }
  }

  const memoizedhandleNewRecipe = useCallback(() => {
    setCurrentRecipe?.(undefined);
  }, [setCurrentRecipe]);

  function handleClickRemove() {
    if (removeRecipe && currentRecipe?.id) {
      removeRecipe(currentRecipe.id);
    }

    setCurrentRecipe?.(undefined);
  }

  function handleEdit() {
    setEditing?.(true);
  }

  function renderBody() {
    if (editing) {
      return <RecipeRegister recipeToEdit={currentRecipeDto} />;
    }

    return (
      <RecipeContainer
        recipe={currentRecipe}
        setCurrentFoodQuantity={setCurrentFoodQuantity}
        setCurrentFood={setCurrentFood}
      />
    );
  }

  useEffect(() => {
    if (!currentRecipe?.id) {
      setEditing?.(true);
    } else {
      setEditing?.(false);
    }
  }, [currentRecipe]);

  useEffect(() => {
    rendered += 1;

    setTimeout(() => {
      rendered += 1;
    }, 0);

    if (rendered < 4) {
      return;
    }

    const elPage = document.querySelector('#root-content');

    elPage?.scrollTo({
      left: 9999,
      behavior: 'smooth',
    });

    const elRecipePanel = document.querySelector('#recipe');

    elRecipePanel?.scrollTo({
      top: 0,
    });
  }, [currentRecipe, editing]);

  return (
    <Panel id="recipe">
      <Layout
        showHeader={false}
        showFooter={!editing}
        mainProps={{
          style: { marginTop: 0 },
        }}
        footerProps={{
          items: [
            {
              onClick: memoizedhandleNewRecipe,
              icon: <IoAddCircleOutline />,
              key: 'add',
            },
            {
              hidden: (currentRecipe?.id ?? 0) < 10000,
              onClick: handleEdit,
              icon: <IoCreateOutline />,
              key: 'edit',
            },
            {
              hidden: (currentRecipe?.id ?? 0) < 10000,
              onClick: handleShare,
              icon: <IoShareOutline />,
              key: 'share',
            },
            {
              hidden: (currentRecipe?.id ?? 0) < 10000,
              onClick: handleClickRemove,
              icon: <IoTrashOutline />,
              key: 'remove',
            },
          ],
        }}
      >
        <div className="paper-bg">{renderBody()}</div>
      </Layout>
    </Panel>
  );
};

export default RecipePanel;

