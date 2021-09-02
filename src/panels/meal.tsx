import React, {
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '../components/container/container';
import StyleContext from '../contexts/style';
import { MealService, MEAL_DATA, MealData } from '../services/meal';
import { UrlService } from '../services/url';
import ScoreComponent from '../components/score';
import MealRegister from '../components/meal-register';
import AminoAcidsTable from '../components/aminoacids-table';
import FoodsContext from '../contexts/foods-context';
import Ingredients from '../components/ingredients/ingredients';
import Preparation from '../components/preparation/preparation';
import Layout from '../components/layout/layout';
import { CurrentPage } from '../services/page.service';
import Section from '../components/section/section';
import Image from '../components/image';
import { Food } from '../services/food';
import AccountContext from '../contexts/account-context';

const useStyles = makeStyles({
  buttonTool: {
    minWidth: 'initial',
  },
  buttonNew: {
    position: 'sticky',
    bottom: 15,
    right: 0,
    display: 'flex',
    marginLeft: 'auto',
    marginTop: 15,
  },
  toolsButton: {
    transform: 'translateX(12px)',
    padding: 0,
  },
});

const MealPageStyle: FC<{ editing: boolean }> = ({
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

const MealPanel: FC<{
  currentRecipeData: MealData;
  setCurrentRecipeData(data: MealData): void;
  setCurrentFood(food: Food): void;
}> = ({
  currentRecipeData = MEAL_DATA,
  setCurrentRecipeData,
  setCurrentFood,
}) => {
  const { setAccount } = useContext(AccountContext);
  const foods = useContext(FoodsContext);
  const meal = MealService.format({ foods, mealData: currentRecipeData });
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
    const toShare = MealService.formatToShare(currentRecipeData);
    const url = `${window.location.origin}?${toShare}#meal-panel` ?? '';
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

  function handleNewMeal() {
    setCurrentRecipeData(MEAL_DATA);
    handleClose();
  }

  function handleClickRemove() {
    setAccount?.removeMeal(meal.id);
    handleClose();
    setCurrentRecipeData(MEAL_DATA);
  }

  function handleEdit() {
    setEditing(true);
    handleClose();
  }

  const pageName = meal.name ? (
    <span style={{ fontSize: meal.name.length > 22 ? '18px' : '20px' }}>
      {meal.name}
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

    const elMealPanel = document.querySelector('#meal-panel');

    elMealPanel?.scrollTo({
      top: 0,
    });
  }, [currentRecipeData]);

  return (
    <Layout
      currentPage={CurrentPage.MEAL}
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
      <MealPageStyle editing={editing}>
        {!editing && (
          <Box marginBottom={3}>
            <Image src={meal.image} alt="" aspectRatio={1.25} />
          </Box>
        )}
        <Container>
          <Grid container spacing={4}>
            {!editing ? (
              <>
                {meal.description && (
                  <Grid item xs={12}>
                    <Typography>{meal.description}</Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Ingredients
                    portions={meal.portions}
                    setCurrentFood={setCurrentFood}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Preparation preparation={meal.preparation} />
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <MealRegister
                  mealData={currentRecipeData}
                  meal={meal}
                  setCurrentRecipeData={setCurrentRecipeData}
                  editing={editing}
                />
              </Grid>
            )}
            {!editing && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h2" component="h2" color="secondary">
                    Informações nutricionais
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ScoreComponent meal={meal} />
                </Grid>
                <Grid item xs={12}>
                  <Section title="Tabela de aminoácidos">
                    <AminoAcidsTable aminoAcids={meal.aminoAcids} />
                  </Section>
                </Grid>
              </>
            )}
          </Grid>
          {!editing && (
            <Fab
              size="small"
              color="primary"
              aria-label="nova receita"
              className={classes.buttonNew}
              onClick={handleNewMeal}
            >
              <AddIcon />
            </Fab>
          )}
        </Container>
      </MealPageStyle>
    </Layout>
  );
};

export default MealPanel;
