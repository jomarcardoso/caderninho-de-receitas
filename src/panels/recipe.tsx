import React, {
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import StyleContext from '../contexts/style';
import { RecipeService, RECIPE_DATA, RecipeData } from '../services/recipe';
import { UrlService } from '../services/url';
import FoodsContext from '../contexts/foods-context';
import Layout from '../components/layout/layout';
import { CurrentPage } from '../services/page.service';
import { Food } from '../services/food';
import AccountContext from '../contexts/account-context';
import RecipeRegisterContainer from '../components/recipe-register-container/recipe-register-container';
import RecipeContainer from '../components/recipe-container/recipe-container';

const useStyles = makeStyles({
  toolsButton: {
    transform: 'translateX(12px)',
    padding: 0,
  },
});

const RecipePanelStyle: FC<{ editing: boolean }> = ({
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

const RecipePanel: FC<{
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
  const classes = useStyles();
  const [editing, setEditing] = useState(true);
  const [anchorElTools, setAnchorElTools] = useState<Element | null>();

  function handleClickToolsMenu(event: SyntheticEvent) {
    setAnchorElTools(event.currentTarget);
  }

  function handleClose() {
    setAnchorElTools(null);
  }

  async function handleShare() {
    const toShare = RecipeService.formatToShare(currentRecipeData);
    const url = `${window.location.origin}?${toShare}#recipe-panel` ?? '';
    const title = currentRecipeData.name || 'Receita';
    const urlShort = await UrlService.shortener(url);

    handleClose();

    if (!navigator.share) return;

    navigator.share({
      title,
      text: title,
      url: urlShort,
    });
  }

  function handleNewRecipe() {
    setCurrentRecipeData(RECIPE_DATA);
    handleClose();
  }

  function handleClickRemove() {
    setAccount?.removeRecipe(recipe.id);
    handleClose();
    setCurrentRecipeData(RECIPE_DATA);
  }

  function handleEdit() {
    setEditing(true);
    handleClose();
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
      <RecipeContainer
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
      showFooter={false}
      headerProps={{
        pageName,
        tools: (
          <>
            <Button
              aria-owns={anchorElTools ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClickToolsMenu}
              className={classes.toolsButton}
            >
              <IconButton color="secondary">
                <MoreVertIcon />
              </IconButton>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorElTools}
              open={Boolean(anchorElTools)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit}>editar receita</MenuItem>
              <MenuItem onClick={handleShare}>compartilhar</MenuItem>
              <MenuItem onClick={handleClickRemove}>apagar</MenuItem>
            </Menu>
          </>
        ),
      }}
      mainProps={{
        mt: !editing ? 0 : 5,
        containerProps: { disableGutters: true },
      }}
    >
      <RecipePanelStyle editing={editing}>{renderBody()}</RecipePanelStyle>
    </Layout>
  );
};

export default RecipePanel;
