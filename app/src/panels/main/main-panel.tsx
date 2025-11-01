import { type FC, useContext } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import capitalize from 'lodash/capitalize';
import Layout from '../../components/layout/layout';
import { Button } from 'notebook-layout';
import { DataContext } from '../../providers/data/data.context';
import './main-panel.scss';
import { ListItem } from '../../components/list-item/list-item';
import { UserBox } from '../../components/user-box/user-box';
import CurrentRecipeContext from '../../providers/current-recipe/current-recipe.context';
import { useScroll } from '../../hooks/use-scroll';
// import { ShoppingList } from '../../components/shopping-list';
import type { Recipe } from 'services/recipe/recipe.model';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';

/* <div className="main__story-partner">
<ChefSvg style={{ mixBlendMode: 'multiply' }} />
</div> */

const MainPanel: FC = () => {
  const { language } = useContext(LanguageContext);
  const { currentRecipeId, setCurrentRecipeId } = useContext(CurrentRecipeContext);
  const { data } = useContext(DataContext);
  const { recipes = [] } = data || {};
  const alphabeticalRecipes = recipes.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }

    return 0;
  });
  useScroll();

  function handleClickLink(recipe: Recipe) {
    setCurrentRecipeId?.(recipe.id);
  }

  function renderItem(recipe: Recipe) {
    return (
      <ListItem
        key={recipe.id}
        isAction
        isActive={recipe.id === currentRecipeId}
        tabIndex={0}
        onClick={() => handleClickLink(recipe)}
      >
        {capitalize(recipe.name)}
      </ListItem>
    );
  }

  return (
    <Layout
      footerMenu
      showHeader={false}
      footerProps={{
        children: <UserBox />,
      }}
      tabs={[
        {
          children: translate('recipesTab', language),
          link: '#minhas-receitas',
        },
        {
          children: translate('marketTab', language),
          link: '#lista-de-compras',
        },
      ]}
    >
      <div
        className="container"
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
          paddingLeft: '36px',
        }}
      >
        <div className="grid" ovo-scrollspy-content="1" id="minhas-receitas">
          <div className="g-col-12">
            <h1 className="section-title">
              {translate('myRecipesHeading', language)}
            </h1>
          </div>

          <div className="g-col-12">
            <ol className="list">{alphabeticalRecipes.map(renderItem)}</ol>
          </div>

          <div className="g-col-12">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="secondary"
                onClick={() => setCurrentRecipeId?.(undefined)}
              >
                <IoAddCircleOutline />
                {translate('addNewRecipe', language)}
              </Button>
            </div>
          </div>
        </div>

        {/* <ShoppingList /> */}
      </div>
    </Layout>
  );
};

export default MainPanel;

