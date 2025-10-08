import { useState, useEffect, useContext } from 'react';
import type { FC, HTMLProps } from 'react';
import { Panel } from './components/panel/panel';
import RecipePanel from './panels/recipe/recipe-panel';
import FoodsPanel from './panels/foods/foods-panel';
import DialogFood from './components/dialog-food/dialog-food';
import LoadingOverlay from './components/loading-overlay/loading-overlay';
import MainPanel from './panels/main/main-panel';
import Header from './components/root-header/root-header';
import './app.scss';
// import { DialogSharedRecipe } from '../../components/dialog-shared-recipe/dialog-shared-recipe';
import { LanguageContext } from './providers/language/language.context';
import { translate } from 'services/language/language.service';
import type { Food } from 'services/food/food.model';

export type AppProps = HTMLProps<HTMLDivElement>;

export const App: FC<AppProps> = (props) => {
  const { language } = useContext(LanguageContext);
  const [hideLeftPanel, setHideLeftPanel] = useState(true);
  const [currentFood, setCurrentFood] = useState<Food | undefined>();
  const [currentFoodQuantity, setCurrentFoodQuantity] = useState(40);

  useEffect(() => {
    setHideLeftPanel(false);
  }, []);

  return (
    <>
      <LoadingOverlay />
      <DialogFood
        food={currentFood}
        onClose={() => setCurrentFood(undefined)}
        open={Boolean(currentFood?.name[language])}
        quantity={currentFoodQuantity}
      />
      {/* <DialogSharedRecipe /> */}
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
          <MainPanel />
        </Panel>

        <RecipePanel
          setCurrentFood={setCurrentFood}
          setCurrentFoodQuantity={setCurrentFoodQuantity}
        />
      </div>
    </>
  );
};

