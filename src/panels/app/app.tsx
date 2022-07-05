import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import last from 'lodash/last';
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
import AccountContext from '../../contexts/account-context';
import { RECIPE, RecipeService, RECIPE_DATA } from '../../services/recipe';
import CurrentRecipeContext from '../../contexts/current-recipe';
import FirebaseContext from '../../contexts/firebase-context';
import { useFirebase } from '../../hooks/use-firebase';

export type AppProps = BoxProps;

// to load with the page
const useStyles = makeStyles({
  display: {
    display: 'flex',
    width: '100vw',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    height: 'calc(100vh - var(--header-height) - var(--address-bar-height))',
    overflow: 'scroll',
  },
});

const AppPage: FC<BoxProps> = (props) => {
  const firebase = useFirebase();
  const classes = useStyles();
  const [hideLeftPanel, setHideLeftPanel] = useState(true);
  const [currentFood, setCurrentFood] = useState(FOOD);
  const [currentFoodQuantity, setCurrentFoodQuantity] = useState(100);
  const { account } = useContext(AccountContext);
  const {
    currentRecipeData,
    setCurrentRecipeData,
    setCurrentRecipe,
    restoreLastRecipe,
  } = useRecipe(
    RecipeService.unFormat(last(account.recipes) || RECIPE) || RECIPE_DATA,
  );
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
    <FirebaseContext.Provider value={firebase}>
      <CurrentRecipeContext.Provider value={memoizedCurrentRecipe}>
        <DialogFood
          food={currentFood}
          onClose={() => setCurrentFood(FOOD)}
          open={Boolean(currentFood.name)}
          quantity={currentFoodQuantity}
        />
        <Header />
        <Box className={classes.display} id="root-content" {...props}>
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
          <SEO title="Caderninho de Receitas" />
        </Box>
        <LoadingContext.Consumer>
          {({ loading = false }) => <PageLoader open={loading} />}
        </LoadingContext.Consumer>
      </CurrentRecipeContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default AppPage;
