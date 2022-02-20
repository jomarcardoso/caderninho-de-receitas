import React, { FC, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import last from 'lodash/last';
import Panel from '../components/panel/panel';
import RecipePanel from './recipe-panel';
import SEO from '../components/seo';
import FoodsPanel from './foods/foods';
import DialogFood from '../components/dialog-food/dialog-food';
import MainPanel from './main/main-panel';
import Header from '../components/root-header/root-header';
import PageLoader from '../components/page-loader/page-loader';
import LoadingContext from '../contexts/loading';
import { FOOD } from '../services/food';
import useRecipe from '../hooks/use-current-recipe';
import AccountContext from '../contexts/account-context';
import { RECIPE, RecipeService, RECIPE_DATA } from '../services/recipe';
import CurrentRecipeContext from '../contexts/current-recipe';

const useStyles = makeStyles({
  display: {
    display: 'flex',
    width: '100vw',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    height: 'calc(100vh - 48px - var(--address-bar-height))',
    overflow: 'scroll',
  },
});

const IndexContainer: FC = () => {
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

  useEffect(() => {
    setHideLeftPanel(false);
  }, []);

  return (
    <CurrentRecipeContext.Provider
      value={{
        currentRecipeData,
        restoreLastRecipe,
        setCurrentRecipe,
        setCurrentRecipeData,
      }}
    >
      <DialogFood
        food={currentFood}
        onClose={() => setCurrentFood(FOOD)}
        open={Boolean(currentFood.name)}
        quantity={currentFoodQuantity}
      />
      <Header />
      <Box className={classes.display} id="root-content">
        <Panel
          id="foods-panel"
          style={{ display: hideLeftPanel ? 'none' : 'initial' }}
        >
          <FoodsPanel setCurrentFood={setCurrentFood} />
        </Panel>
        <Panel id="main-panel">
          <MainPanel setCurrentRecipe={setCurrentRecipe} />
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
  );
};

export default IndexContainer;
