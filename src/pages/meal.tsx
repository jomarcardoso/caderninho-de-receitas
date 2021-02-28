import React, { FC, useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Divider from '@material-ui/core/Divider';
import StyleContext from '../contexts/style';
import Layout from '../components/layout/layout';
import { SHAPE_ACCOUNT } from '../services/account.service';
import AccountContext from '../contexts/account-context';
import { MealService, MEAL_DATA, MEAL } from '../services/meal';
import ScoreComponent from '../components/score';
import MealRegister from '../components/meal-register';
import { CurrentPage } from '../services/page.service';
import AminoAcidsTable from '../components/aminoacids-table';
import FoodsContext from '../contexts/foods-context';
import Image from '../components/image';
import Ingredients from '../components/ingredients/ingredients';
import Preparation from '../components/preparation/preparation';

const useStyles = makeStyles({
  imageBanner: {
    padding: '30px',
  },
});

const MealPageStyle: FC<{ editing: boolean }> = ({
  children,
  editing = false,
}) => {
  const { style, setStyle } = useContext(StyleContext);

  useEffect(() => {
    setStyle({
      ...style,
      bgBody: editing ? 'white' : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  return <>{children}</>;
};

const MealPage: FC<{ location: Location }> = ({ location }) => {
  const sharedString = location.search;
  const foods = useContext(FoodsContext);
  const initialId = Number(location?.hash?.replace('#', '') ?? 0);
  const [id, setId] = useState(initialId);
  const { account = SHAPE_ACCOUNT } = useContext(AccountContext);
  let meal = MEAL;
  let mealData = MEAL_DATA;
  const [editing, setEditing] = useState(!id);
  const classes = useStyles();

  function getPageName(): string {
    if (id) {
      return editing ? 'Editar receita' : 'Receita';
    }

    return 'Nova receita';
  }

  const pageName = getPageName();

  if (sharedString) {
    mealData = MealService.unFormatToShare(sharedString);
    meal = MealService.format({ mealData, foods });
  } else {
    meal = account.meals.find(({ id: mealId }) => mealId === id) ?? MEAL;
    mealData = MealService.unFormat(meal);
  }

  function handleShare() {
    const toShare = MealService.formatToShare(mealData);
    const url = `${location.origin}/meal/?${toShare}` ?? '';
    const title = mealData.name || 'Receita';

    if (!navigator.share) return;

    navigator.share({
      title,
      text: title,
      url,
    });
  }

  return (
    <Layout currentPage={CurrentPage.MEAL} pageName={pageName}>
      <MealPageStyle editing={editing}>
        <Grid container spacing={4}>
          {!editing ? (
            <>
              <Grid item xs={12}>
                <Box
                  bgcolor="white"
                  className={classes.imageBanner}
                  border={1}
                  borderColor="grey.300"
                  borderRadius={4}
                >
                  <Grid container justify="center">
                    <Grid item xs={6}>
                      <Image src={meal.image} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant="h1" component="h1">
                      {meal.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => setEditing(true)} size="small">
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={handleShare} size="small">
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography>{meal.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
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
                setId={setId}
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

export default MealPage;
