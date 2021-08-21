import React, { FC, useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ShareIcon from '@material-ui/icons/Share';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Divider from '@material-ui/core/Divider';
import Card from '../components/card/card';
import StyleContext from '../contexts/style';
// import Layout from '../components/layout/layout';
import Image from '../components/image';
import { ACCOUNT } from '../services/account.service';
import AccountContext from '../contexts/account-context';
import { MealService, MEAL_DATA, MEAL } from '../services/meal';
import { UrlService } from '../services/url';
import ScoreComponent from '../components/score';
import MealRegister from '../components/meal-register';
// import { CurrentPage } from '../services/page.service';
import AminoAcidsTable from '../components/aminoacids-table';
import FoodsContext from '../contexts/foods-context';
import Ingredients from '../components/ingredients/ingredients';
import Preparation from '../components/preparation/preparation';
import Layout from '../components/layout/layout';
import { CurrentPage } from '../services/page.service';

const useStyles = makeStyles({
  imageBanner: {
    padding: '30px',
    position: 'relative',
  },
  buttonBanner: {
    position: 'absolute',
    top: '10px',
    right: '10px',
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
}> = ({ location, mealId: id = 0, setMealId, editing = false, setEditing }) => {
  const sharedString = location.search;
  const foods = useContext(FoodsContext);
  const { account = ACCOUNT } = useContext(AccountContext);
  let meal = MEAL;
  let mealData = MEAL_DATA;
  const classes = useStyles();

  // function getPageName(): string {
  //   if (id) {
  //     return editing ? 'Editar receita' : 'Receita';
  //   }

  //   return 'Nova receita';
  // }

  // const pageName = getPageName();

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

  return (
    <Layout
      currentPage={CurrentPage.MEAL}
      showFooter={false}
      headerProps={{ pageName: 'Receita' }}
    >
      <MealPageStyle editing={editing}>
        <Grid container spacing={4}>
          {!editing ? (
            <>
              <Grid item xs={12}>
                <Card className={classes.imageBanner}>
                  <Fab
                    size="small"
                    color="secondary"
                    className={classes.buttonBanner}
                    onClick={handleShare}
                  >
                    <ShareIcon fontSize="small" />
                  </Fab>
                  <Grid container justifyContent="center">
                    <Grid item xs={6} sm={5} md={4}>
                      <Image src={meal.image} />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant="h2" component="h2">
                      {meal.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton
                        onClick={() => setEditing(true)}
                        size="medium"
                        color="secondary"
                      >
                        <EditRoundedIcon fontSize="medium" />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography>{meal.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider color="secondary" />
              </Grid>
              <Grid item xs={12}>
                <Ingredients portions={meal.portions} />
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
                <ScoreComponent meal={meal} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                      Tabela de aminoácidos
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <AminoAcidsTable aminoAcids={meal.aminoAcids} />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </MealPageStyle>
    </Layout>
  );
};

export default MealPanel;
