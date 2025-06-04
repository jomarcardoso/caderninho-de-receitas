import React, { FC, useContext } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import capitalize from 'lodash/capitalize';
import Layout from '../../components/layout/layout';
import { Button } from '../../components/button';
import { RecipesContext } from '../../providers/recipes/recipes.context';
import { RECIPE, Recipe } from '../../services/recipe';
import './main-panel.scss';
import { ListItem } from '../../components/list-item/list-item';
import { UserBox } from '../../components/user-box/user-box';
import CurrentRecipeContext from '../../providers/current-recipe/current-recipe.context';
import { useScroll } from '../../hooks/use-scroll';
import { ShoppingList } from '../../components/shopping-list';

/* <div className="main__story-partner">
<ChefSvg style={{ mixBlendMode: 'multiply' }} />
</div> */

const MainPanel: FC = () => {
  const { currentRecipe, setCurrentRecipe } = useContext(CurrentRecipeContext);
  const { recipes: savedRecipes = [] } = useContext(RecipesContext);
  const alphabeticalRecipes = savedRecipes.sort((a, b) => {
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
    setCurrentRecipe?.(recipe);
  }

  function renderItem(recipe: Recipe) {
    return (
      <ListItem
        key={recipe.id}
        isAction
        isActive={recipe.id === currentRecipe.id}
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
          children: 'receitas',
          link: '#minhas-receitas',
        },
        {
          children: 'mercado',
          link: '#lista-de-compras',
        },
      ]}
    >
      <div
        className="container paper-bg"
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
          paddingLeft: '36px',
        }}
      >
        <div className="grid" ovo-scrollspy-content="1" id="minhas-receitas">
          <div className="g-col-12">
            <h1 className="section-title">Minhas receitas</h1>
          </div>

          <div className="g-col-12">
            <ol className="list">{alphabeticalRecipes.map(renderItem)}</ol>
          </div>

          <div className="g-col-12">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="secondary"
                contrast="light"
                onClick={() => setCurrentRecipe?.(RECIPE)}
              >
                <IoAddCircleOutline />
                adicionar nova receita
              </Button>
            </div>
          </div>
        </div>

        <ShoppingList />
      </div>
    </Layout>
  );
};

export default MainPanel;
