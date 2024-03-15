import React, { FC, useContext } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import capitalize from 'lodash/capitalize';
import Layout from '../../components/layout/layout';
import { Button } from '../../components/button';
import RecipesContext from '../../contexts/recipes-context';
import { RECIPE, Recipe, RecipeData } from '../../services/recipe';
import SectionTitle from '../../components/section-title/section-title';
import useScroll from '../../hooks/use-scroll';
import './main-panel.scss';
import { ListItem } from '../../components/list-item/list-item';
import { UserBox } from '../../components/user-box/user-box';

/* <div className="main__story-partner">
<ChefSvg style={{ mixBlendMode: 'multiply' }} />
</div> */

const MainPanel: FC<{
  setCurrentRecipe(recipe: Recipe): void;
  currentRecipeData: RecipeData;
}> = ({ setCurrentRecipe, currentRecipeData }) => {
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
    setCurrentRecipe(recipe);
  }

  function renderItem(recipe: Recipe) {
    return (
      // eslint-disable-next-line
      <ListItem
        key={recipe.id}
        // eslint-disable-next-line
        isAction
        isActive={recipe.id === currentRecipeData.id}
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
    >
      <div
        className="container paper-bg"
        style={{ paddingTop: '40px', paddingBottom: '40px' }}
      >
        <div className="grid">
          <div className="g-col-12">
            <SectionTitle>Minhas receitas</SectionTitle>
          </div>

          <div className="g-col-12">
            <ol className="list">{alphabeticalRecipes.map(renderItem)}</ol>
          </div>

          <div className="g-col-12">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="secondary"
                contrast="light"
                onClick={() => setCurrentRecipe(RECIPE)}
              >
                <IoAddCircleOutline />
                adicionar nova receita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MainPanel;
