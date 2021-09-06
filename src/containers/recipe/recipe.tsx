import React, { FC, useContext, useEffect, useState } from 'react';
import StyleContext from '../../contexts/style';
import { RecipeService, RECIPE_DATA, RecipeData } from '../../services/recipe';
import { UrlService } from '../../services/url';
import FoodsContext from '../../contexts/foods-context';
import Layout from '../../components/layout/layout';
import { CurrentPage } from '../../services/page.service';
import { Food } from '../../services/food';
import AccountContext from '../../contexts/account-context';
import RecipeRegisterContainer from '../../components/recipe-register-container/recipe-register-container';
import RecipeComponent from '../../components/recipe-container/recipe-container';

const RecipeContainerStyle: FC<{ editing: boolean }> = ({
  children,
  editing = false,
}) => {
  const { style, setStyle } = useContext(StyleContext);

  useEffect(() => {
    if (!setStyle) return;

    setStyle({
      ...style,
      bgBody: editing ? 'white' : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  return <>{children}</>;
};

const RecipeContainer: FC<{
  currentRecipeData: RecipeData;
  setCurrentRecipeData(data: RecipeData): void;
  setCurrentFood(food: Food): void;
}> = ({
  currentRecipeData = RECIPE_DATA,
  setCurrentRecipeData,
  setCurrentFood,
}) => {
  const { setAccount } = useContext(AccountContext);
  const foods = useContext(FoodsContext);
  const recipe = RecipeService.format({ foods, recipeData: currentRecipeData });
  const [editing, setEditing] = useState(true);

  async function handleShare() {
    const toShare = RecipeService.formatToShare(currentRecipeData);
    const url = `${window.location.origin}?${toShare}#recipe-panel` ?? '';
    const title = currentRecipeData.name || 'Receita';
    const urlShort = await UrlService.shortener(url);

    if (!navigator.share) return;

    navigator.share({
      title,
      text: title,
      url: urlShort,
    });
  }

  function handleNewRecipe() {
    setCurrentRecipeData(RECIPE_DATA);
  }

  function handleClickRemove() {
    setAccount?.removeRecipe(recipe.id);
    setCurrentRecipeData(RECIPE_DATA);
  }

  function handleEdit() {
    setEditing(true);
  }

  function renderBody() {
    if (editing) {
      return (
        <RecipeRegisterContainer
          currentRecipeData={currentRecipeData}
          onNewRecipe={handleNewRecipe}
          recipe={recipe}
          setCurrentRecipeData={setCurrentRecipeData}
        />
      );
    }

    return (
      <RecipeComponent
        onNewRecipe={handleNewRecipe}
        recipe={recipe}
        setCurrentFood={setCurrentFood}
      />
    );
  }

  const pageName = recipe.name ? (
    <span style={{ fontSize: recipe.name.length > 22 ? '18px' : '20px' }}>
      {recipe.name}
    </span>
  ) : (
    'Nova receita'
  );

  useEffect(() => {
    if (!currentRecipeData.id) {
      setEditing(true);
    } else {
      setEditing(false);
    }

    const elRecipePanel = document.querySelector('#recipe-panel');

    elRecipePanel?.scrollTo({
      top: 0,
    });
  }, [currentRecipeData]);

  return (
    <Layout
      currentPage={CurrentPage.RECIPE}
      showHeader={false}
      headerProps={{
        pageName,
      }}
      mainProps={{
        mt: !editing ? 0 : 5,
        containerProps: { disableGutters: true },
      }}
      footerProps={{
        items: [
          {
            onClick: handleEdit,
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path
                  fill="currentColor"
                  d="M418 316l20-20c4-4 10-2 10 4v164c0 27-21 48-48 48H48c-26 0-48-21-48-48V112c0-26 22-48 48-48h292c6 0 8 7 5 10l-20 20-5 2H48c-9 0-16 7-16 16v352c0 9 7 16 16 16h352c9 0 16-7 16-16V320l2-5zm146-192L251 437l-100 11c-13 1-24-10-23-23l11-100L452 12c16-16 43-16 59 0l53 53c16 16 16 43 0 59zm-94 49l-67-67-233 234-8 75 75-9 233-233zm71-85l-52-53c-4-4-11-4-15 0l-48 48 67 67 48-48c4-4 4-11 0-15z"
                />
              </svg>
            ),
          },
          {
            onClick: handleShare,
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path
                  fill="currentColor"
                  d="M567 169L407 9c-20-20-55-6-55 23v73c-142 3-264 38-264 181 0 85 50 134 79 156 25 17 58-5 50-35-29-102 8-123 135-126v71c0 29 35 43 55 23l160-160c12-13 12-33 0-46zM384 352V248c-142 1-241 15-198 168-31-23-66-65-66-130 0-134 132-149 264-150V32l160 160-160 160zm37 52l7-5c8-8 20-2 20 8v57c0 27-21 48-48 48H48c-27 0-48-21-48-48V112c0-27 21-48 48-48h172c7 0 12 5 12 12 0 5-4 10-9 11a327 327 0 00-31 9H48c-9 0-16 7-16 16v352c0 9 7 16 16 16h352c9 0 16-7 16-16v-50c0-4 2-8 5-10z"
                />
              </svg>
            ),
          },
          {
            onClick: handleClickRemove,
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M296 432h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8zm-160 0h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8zM440 64H336l-34-45a48 48 0 00-38-19h-80a48 48 0 00-38 19l-34 45H8a8 8 0 00-8 8v16a8 8 0 008 8h24v368a48 48 0 0048 48h288a48 48 0 0048-48V96h24a8 8 0 008-8V72a8 8 0 00-8-8zM171 38a16 16 0 0113-6h80a16 16 0 0113 6l19 26H152zm213 426a16 16 0 01-16 16H80a16 16 0 01-16-16V96h320zm-168-32h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8z"
                />
              </svg>
            ),
          },
        ],
        // <MenuItem onClick={handleEdit}>editar receita</MenuItem>
        // <MenuItem onClick={handleShare}>compartilhar</MenuItem>
        // <MenuItem onClick={handleClickRemove}>apagar</MenuItem>
      }}
    >
      <RecipeContainerStyle editing={editing}>
        {renderBody()}
      </RecipeContainerStyle>
    </Layout>
  );
};

export default RecipeContainer;
