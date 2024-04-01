import React, {
  FC,
  useState,
  useEffect,
  useContext,
  useMemo,
  HTMLProps,
} from 'react';
import last from 'lodash/last';
import Panel from '../../components/panel/panel';
import RecipePanel from '../recipe/recipe-panel';
import SEO from '../../components/seo';
import FoodsPanel from '../foods/foods';
import DialogFood from '../../components/dialog-food/dialog-food';
import MainPanel from '../main/main-panel';
import Header from '../../components/root-header/root-header';
import { FOOD } from '../../services/food';
import useRecipe from '../../hooks/use-current-recipe';
import RecipesContext from '../../contexts/recipes-context';
import { RECIPE } from '../../services/recipe';
import CurrentRecipeContext from '../../contexts/current-recipe';
import './app.scss';
import { DialogSharedRecipe } from '../../components/dialog-shared-recipe/dialog-shared-recipe';

export type AppProps = HTMLProps<HTMLDivElement>;

const AppPage: FC<AppProps> = (props) => {
  const [hideLeftPanel, setHideLeftPanel] = useState(true);
  const [currentFood, setCurrentFood] = useState(FOOD);
  const [currentFoodQuantity, setCurrentFoodQuantity] = useState(40);
  const { recipes = [] } = useContext(RecipesContext);
  const { currentRecipe, setCurrentRecipe, restoreLastRecipe } = useRecipe(
    last(recipes) || RECIPE,
  );
  const memoizedCurrentRecipe = useMemo(
    () => ({
      currentRecipe,
      restoreLastRecipe,
      setCurrentRecipe,
    }),
    [currentRecipe, restoreLastRecipe, setCurrentRecipe, setCurrentRecipe],
  );

  useEffect(() => {
    setHideLeftPanel(false);
  }, []);

  return (
    <CurrentRecipeContext.Provider value={memoizedCurrentRecipe}>
      <>
        <DialogFood
          food={currentFood}
          onClose={() => setCurrentFood(FOOD)}
          open={Boolean(currentFood.name)}
          quantity={currentFoodQuantity}
        />
        <DialogSharedRecipe />
        <Header />
        <div className="app-page__body" id="root-content" {...props}>
          <Panel
            id="foods"
            style={{ display: hideLeftPanel ? 'none' : 'initial' }}
          >
            <FoodsPanel
              setCurrentFood={setCurrentFood}
              setCurrentFoodQuantity={setCurrentFoodQuantity}
            />
          </Panel>

          <Panel id="main">
            <MainPanel
              currentRecipe={currentRecipe}
              setCurrentRecipe={setCurrentRecipe}
            />
          </Panel>

          <RecipePanel
            currentRecipe={currentRecipe}
            setCurrentRecipe={setCurrentRecipe}
            setCurrentFood={setCurrentFood}
            setCurrentFoodQuantity={setCurrentFoodQuantity}
          />
        </div>
      </>

      <SEO title="Caderninho de Receitas" />
    </CurrentRecipeContext.Provider>
  );
};

export default AppPage;
