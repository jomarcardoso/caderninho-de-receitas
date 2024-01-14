import React, {
  FC,
  useState,
  useEffect,
  useContext,
  useMemo,
  HTMLProps,
} from 'react';
import last from 'lodash/last';
import { Grid } from '@mui/material';
import Panel from '../../components/panel/panel';
import RecipePanel from '../recipe/recipe-panel';
import SEO from '../../components/seo';
import FoodsPanel from '../foods/foods';
import DialogFood from '../../components/dialog-food/dialog-food';
import MainPanel from '../main/main-panel';
import Header from '../../components/root-header/root-header';
import PageLoader from '../../components/page-loader/page-loader';
import LoadingContext from '../../contexts/loading';
import { FOOD } from '../../services/food';
import useRecipe from '../../hooks/use-current-recipe';
import RecipesContext from '../../contexts/recipes-context';
import { RECIPE, RecipeService, RECIPE_DATA } from '../../services/recipe';
import CurrentRecipeContext from '../../contexts/current-recipe';
import './app.scss';
import { isMobile } from '../../services/user-agent/user-agent.service';
import DesktopHeader from '../../components/desktop-header/desktop-header';

export type AppProps = HTMLProps<HTMLDivElement>;

const AppPage: FC<AppProps> = (props) => {
  const [hideLeftPanel, setHideLeftPanel] = useState(true);
  const [currentFood, setCurrentFood] = useState(FOOD);
  const [currentFoodQuantity, setCurrentFoodQuantity] = useState(100);
  const { recipes = [] } = useContext(RecipesContext);
  const {
    currentRecipeData,
    setCurrentRecipeData,
    setCurrentRecipe,
    restoreLastRecipe,
  } = useRecipe(RecipeService.unFormat(last(recipes) || RECIPE) || RECIPE_DATA);
  const memoizedCurrentRecipe = useMemo(
    () => ({
      currentRecipeData,
      restoreLastRecipe,
      setCurrentRecipe,
      setCurrentRecipeData,
    }),
    [
      currentRecipeData,
      restoreLastRecipe,
      setCurrentRecipe,
      setCurrentRecipeData,
    ],
  );

  useEffect(() => {
    setHideLeftPanel(false);
  }, []);

  return (
    <CurrentRecipeContext.Provider value={memoizedCurrentRecipe}>
      {isMobile() ? (
        <>
          <DialogFood
            food={currentFood}
            onClose={() => setCurrentFood(FOOD)}
            open={Boolean(currentFood.name)}
            quantity={currentFoodQuantity}
          />
          <Header />
          <div className="app-page__body" id="root-content" {...props}>
            <Panel
              id="foods-panel"
              style={{ display: hideLeftPanel ? 'none' : 'initial' }}
            >
              <FoodsPanel
                setCurrentFood={setCurrentFood}
                setCurrentFoodQuantity={setCurrentFoodQuantity}
              />
            </Panel>

            <Panel id="main-panel">
              <MainPanel
                currentRecipeData={currentRecipeData}
                setCurrentRecipe={setCurrentRecipe}
              />
            </Panel>

            <RecipePanel
              currentRecipeData={currentRecipeData}
              setCurrentRecipeData={setCurrentRecipeData}
              setCurrentFood={setCurrentFood}
              setCurrentFoodQuantity={setCurrentFoodQuantity}
            />
          </div>
        </>
      ) : (
        <div className="container-desktop">
          <div className="wrapper">
            <DesktopHeader />

            <Grid container>
              <Grid item xs={12} md={5}>
                <FoodsPanel
                  setCurrentFood={setCurrentFood}
                  setCurrentFoodQuantity={setCurrentFoodQuantity}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <MainPanel
                  currentRecipeData={currentRecipeData}
                  setCurrentRecipe={setCurrentRecipe}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      )}
      <SEO title="Caderninho de Receitas" />

      <LoadingContext.Consumer>
        {({ loading = false }) => <PageLoader open={loading} />}
      </LoadingContext.Consumer>
    </CurrentRecipeContext.Provider>
  );
};

export default AppPage;
