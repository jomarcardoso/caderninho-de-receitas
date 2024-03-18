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
import { RECIPE_DATA, RecipeData } from '../../services/recipe';
import FoodsContext from '../../contexts/foods-context';
import Layout from '../../components/layout/layout';
import { Food } from '../../services/food';
import RecipesContext from '../../contexts/recipes-context';
import RecipeRegister from '../../components/recipe-register/recipe-register';
import RecipeContainer from '../../components/recipe-container/recipe-container';
import Panel from '../../components/panel/panel';
import LoadingContext from '../../contexts/loading';
import EditingContext from '../../contexts/editing-context';
import { ShareService } from '../../services/url/share.service';

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

    await ShareService.shareFullRecipe(currentRecipeData);

    if (setLoading) {
      setLoading(false);
    }
  }

  const memoizedhandleNewRecipe = useCallback(() => {
    setCurrentRecipeData(RECIPE_DATA);
  }, [setCurrentRecipeData]);

  function handleClickRemove() {
    if (removeRecipe && currentRecipeData.id) {
      removeRecipe(currentRecipeData.id);
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
        recipe={currentRecipeData}
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
  }, [currentRecipeData, editing]);

  return (
    <EditingContext.Provider value={memoizedEditing}>
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
                hidden: (currentRecipeData?.id ?? 0) < 10000,
                onClick: handleEdit,
                icon: <IoCreateOutline />,
                key: 'edit',
              },
              {
                hidden: (currentRecipeData?.id ?? 0) < 10000,
                onClick: handleShare,
                icon: <IoShareOutline />,
                key: 'share',
              },
              {
                hidden: (currentRecipeData?.id ?? 0) < 10000,
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
    </EditingContext.Provider>
  );
};

export default RecipePanel;
