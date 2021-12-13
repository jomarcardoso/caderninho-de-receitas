import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Panel from '../components/panel/panel';
import RecipePanel from './recipe-panel';
import SEO from '../components/seo';
import FoodsPanel from './foods/foods';
import DialogFood from '../components/dialog-food/dialog-food';
import MainPanel from './main-panel';
import Header from '../components/root-header/root-header';
import PageLoader from '../components/page-loader/page-loader';
import LoadingContext from '../contexts/loading';
import { FOOD } from '../services/food';
import useRecipe from '../hooks/use-current-recipe';

const useStyles = makeStyles({
  display: {
    display: 'flex',
    width: '100vw',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    height: 'calc(100vh - 48px)',
    overflow: 'scroll',
  },
});

const IndexContainer: FC = () => {
  const classes = useStyles();
  const [hideLeftPanel, setHideLeftPanel] = useState(true);
  const [currentFood, setCurrentFood] = useState(FOOD);
  const [currentFoodQuantity, setCurrentFoodQuantity] = useState(100);
  const { currentRecipeData, setCurrentRecipeData, setCurrentRecipe } =
    useRecipe();

  useEffect(() => {
    setHideLeftPanel(false);
  }, []);

  return (
    <>
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
    </>
  );
};

export default IndexContainer;
