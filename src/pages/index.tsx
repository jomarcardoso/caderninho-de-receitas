import React, { FC, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CurrentPage } from '../services/page.service';
import Panel from '../components/panel/panel';
import RecipePanel from '../panels/recipe-panel';
import SEO from '../components/seo';
import Page from '../components/page/page';
import FoodsPanel from '../panels/foods';
import { FOOD } from '../services/food';
import useRecipe from '../hooks/use-current-recipe';
import DialogFood from '../components/dialog-food/dialog-food';
import MainPanel from '../panels/main-panel';
import Header2 from '../components/header2/header2';
import PageLoader from '../components/page-loader/page-loader';
import LoadingContext from '../contexts/loading';

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

const Index: FC = () => {
  const classes = useStyles();
  // const { loading } = useContext(LoadingContext);
  const [hideLeftPanel, setHideLeftPanel] = useState(true);
  const [currentFood, setCurrentFood] = useState(FOOD);
  const [currentPage, setCurrentPage] = useState(CurrentPage.HOME);
  const { currentRecipeData, setCurrentRecipeData, setCurrentRecipe } =
    useRecipe();

  useEffect(() => {
    setHideLeftPanel(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (typeof window === 'undefined') {
        return;
      }

      const { ScrollSpy, createScrollSpyItem } = await import('ovos');

      ScrollSpy({
        method: 'CURRENT',
        axis: 'x',
        elRelative: document.querySelector('#root-content') as HTMLElement,
        list: [
          createScrollSpyItem({
            callback: ({ active }) =>
              active && setCurrentPage(CurrentPage.FOODS),
            elContent: document.querySelector('#foods-panel') as HTMLElement,
            elMenu: document.querySelector('#foods-panel') as HTMLElement,
          }),
          createScrollSpyItem({
            callback: ({ active }) =>
              active && setCurrentPage(CurrentPage.HOME),
            elContent: document.querySelector('#main-panel') as HTMLElement,
            elMenu: document.querySelector('#main-panel') as HTMLElement,
          }),
          createScrollSpyItem({
            callback: ({ active }) =>
              active && setCurrentPage(CurrentPage.RECIPE),
            elContent: document.querySelector('#recipe-panel') as HTMLElement,
            elMenu: document.querySelector('#recipe-panel') as HTMLElement,
          }),
        ],
      });

      clearInterval(interval);
    }, 1000);
  }, []);

  return (
    <Page>
      <DialogFood
        food={currentFood}
        onClose={() => setCurrentFood(FOOD)}
        open={Boolean(currentFood.name)}
      />
      <Header2 currentPage={currentPage} />
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
        />
        <SEO title="Caderninho de Receitas" />
      </Box>
      <LoadingContext.Consumer>
        {({ loading = false }) => <PageLoader open={loading} />}
      </LoadingContext.Consumer>
    </Page>
  );
};

export default Index;
