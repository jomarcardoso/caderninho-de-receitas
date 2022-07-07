import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  IoAddCircleOutline,
  IoCreateOutline,
  IoShareOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import { RecipeService, RECIPE_DATA, RecipeData } from '../../services/recipe';
import FoodsContext from '../../contexts/foods-context';
import Layout from '../../components/layout/layout';
import { Food } from '../../services/food';
import RecipesContext from '../../contexts/recipes-context';
import RecipeRegister from '../../components/recipe-register/recipe-register';
import RecipeContainer from '../../components/recipe-container/recipe-container';
import Panel from '../../components/panel/panel';
import LoadingContext from '../../contexts/loading';
import EditingContext from '../../contexts/editing-context';

let rendered = 0;

const RecipePanel: FC<{
  currentRecipeData: RecipeData;
  setCurrentRecipeData(data: RecipeData): void;
  setCurrentFood(food: Food): void;
  setCurrentFoodQuantity(quantity: number): void;
}> = ({
  currentRecipeData = RECIPE_DATA,
  setCurrentRecipeData,
  setCurrentFood,
  setCurrentFoodQuantity,
}) => {
  const { removeRecipe } = useContext(RecipesContext);
  const foods = useContext(FoodsContext);
  const recipe = RecipeService.format({ foods, recipeData: currentRecipeData });
  const [editing, setEditing] = useState(true);
  const { setLoading } = useContext(LoadingContext);
  const memoizedEditing = useMemo(
    () => ({ editing, setEditing }),
    [editing, setEditing],
  );

  async function handleShare() {
    if (setLoading) {
      setLoading(true);
    }

    const toShare = RecipeService.generateParamsToShare(currentRecipeData);
    const url = `${window.location.origin}?${toShare}#recipe-panel` ?? '';
    const title = currentRecipeData.name || 'Receita';

    if (setLoading) {
      setLoading(false);
    }

    if (!navigator.share) return;

    navigator.share({
      title,
      text: title,
      url,
    });
  }

  const memoizedhandleNewRecipe = useCallback(() => {
    setCurrentRecipeData(RECIPE_DATA);
  }, [setCurrentRecipeData]);

  function handleClickRemove() {
    if (removeRecipe) {
      removeRecipe(recipe.id);
    }

    setCurrentRecipeData(RECIPE_DATA);
  }

  function handleEdit() {
    setEditing(true);
  }

  function renderBody() {
    if (editing) {
      return (
        <RecipeRegister
          recipeData={currentRecipeData}
          setCurrentRecipeData={setCurrentRecipeData}
        />
      );
    }

    return (
      <RecipeContainer
        recipe={recipe}
        setCurrentFoodQuantity={setCurrentFoodQuantity}
        setCurrentFood={setCurrentFood}
      />
    );
  }

  useEffect(() => {
    if (!currentRecipeData.id) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [currentRecipeData]);

  useEffect(() => {
    rendered += 1;

    setTimeout(() => {
      rendered += 1;
    }, 0);

    if (rendered < 3) {
      return;
    }

    const elPage = document.querySelector('#root-content');

    elPage?.scrollTo({
      left: 9999,
      behavior: 'smooth',
    });

    const elRecipePanel = document.querySelector('#recipe-panel');

    elRecipePanel?.scrollTo({
      top: 0,
    });
  }, [currentRecipeData, editing]);

  return (
    <EditingContext.Provider value={memoizedEditing}>
      <Panel id="recipe-panel">
        <Layout
          showHeader={false}
          showFooter={!editing}
          mainProps={{
            mt: 0,
            containerProps: { disableGutters: true },
          }}
          footerProps={{
            items: [
              {
                onClick: memoizedhandleNewRecipe,
                icon: <IoAddCircleOutline />,
              },
              {
                hidden: recipe.id < 10000,
                onClick: handleEdit,
                icon: <IoCreateOutline />,
              },
              {
                hidden: recipe.id < 10000,
                onClick: handleShare,
                icon: <IoShareOutline />,
              },
              {
                hidden: recipe.id < 10000,
                onClick: handleClickRemove,
                icon: <IoTrashOutline />,
              },
            ],
          }}
        >
          {renderBody()}
        </Layout>
      </Panel>
    </EditingContext.Provider>
  );
};

export default RecipePanel;
