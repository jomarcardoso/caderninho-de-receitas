import React, { FC, useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import ButtonIcon from '@material-ui/core/Button';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Container from '../components/container/container';
import StyleContext from '../contexts/style';
import { ACCOUNT } from '../services/account.service';
import AccountContext from '../contexts/account-context';
import { MealService, MEAL_DATA, MEAL } from '../services/meal';
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
  location: Location;
  mealId: number;
  setMealId(id: number): void;
  editing: boolean;
  setEditing(editing: boolean): void;
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
}> = ({
  location,
  mealId: id = 0,
  setMealId,
  editing = false,
  setEditing,
  setCurrentFood,
}) => {
  const sharedString = location.search;
  const foods = useContext(FoodsContext);
  const { account = ACCOUNT } = useContext(AccountContext);
  let meal = MEAL;
  let mealData = MEAL_DATA;
  const classes = useStyles();

  if (sharedString) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mealData = MealService.unFormatToShare(sharedString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    meal = MealService.format({ mealData, foods });
  } else {
    meal = account.meals.find(({ id: mealId }) => mealId === id) ?? MEAL;
    mealData = MealService.unFormat(meal);
  }

  async function handleShare() {
    const toShare = MealService.formatToShare(mealData);
    const url = `${location.origin}?${toShare}#meal-panel` ?? '';
    const title = mealData.name || 'Receita';
    const urlShort = await UrlService.shortener(url);

    if (!navigator.share) return;

    navigator.share({
      title,
      text: title,
      url: urlShort,
    });
  }

  function handleNewMeal() {
    setEditing(true);
    setMealId(0);
  }

  return (
    <Layout
      currentPage={CurrentPage.MEAL}
      showFooter={false}
      headerProps={{ pageName: meal.name || 'Nova receita' }}
      mainProps={{
        mt: !editing ? 0 : 5,
        containerProps: { disableGutters: true },
      }}
    >
      <MealPageStyle editing={editing}>
        {!editing && <Image src={meal.image} alt="" aspectRatio={1.25} />}
        <Container>
          <Grid container spacing={4}>
            {!editing ? (
              <>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <ButtonIcon
                            className={classes.buttonTool}
                            onClick={() => setEditing(true)}
                            size="small"
                            color="secondary"
                            title="editar"
                          >
                            <EditRoundedIcon fontSize="medium" />
                          </ButtonIcon>
                        </Grid>
                        <Grid item>
                          <ButtonIcon
                            className={classes.buttonTool}
                            onClick={handleShare}
                            size="small"
                            color="secondary"
                            title="compartilhar"
                          >
                            <ShareIcon fontSize="medium" />
                          </ButtonIcon>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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
                  mealData={mealData}
                  meal={meal}
                  setId={setMealId}
                  editing={editing}
                  setEditing={setEditing}
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
