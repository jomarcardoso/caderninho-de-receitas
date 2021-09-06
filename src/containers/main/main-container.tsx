import React, { FC, useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Layout from '../../components/layout/layout';
import AccountContext from '../../contexts/account-context';
import { AccountAndSet, ACCOUNT } from '../../services/account.service';
import { RECIPE, Recipe } from '../../services/recipe';
import RecipeCardResumed from '../../components/recipe-card-resumed/recipe-card-resumed';
import { CurrentPage } from '../../services/page.service';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  toolsButton: {
    transform: 'translateX(12px)',
    padding: 0,
  },
});

const MainContainer: FC<{ setCurrentRecipe(recipe: Recipe): void }> = ({
  setCurrentRecipe,
}) => {
  const { account = ACCOUNT }: AccountAndSet = useContext(AccountContext);
  const classes = useStyles();

  function renderItem(recipe: Recipe) {
    return (
      <Grid item xs={6} sm={4} className={classes.card}>
        <RecipeCardResumed
          recipe={recipe}
          setCurrentRecipe={setCurrentRecipe}
        />
      </Grid>
    );
  }

  return (
    <Layout
      currentPage={CurrentPage.HOME}
      showHeader={false}
      footerProps={{
        items: [
          {
            onClick: () => setCurrentRecipe(RECIPE),
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M400 64c9 0 16 7 16 16v352c0 9-7 16-16 16H48c-9 0-16-7-16-16V80c0-9 7-16 16-16h352m0-32H48C22 32 0 54 0 80v352c0 27 22 48 48 48h352c27 0 48-21 48-48V80c0-26-21-48-48-48zm-60 206h-98v-98c0-7-5-12-12-12h-12c-7 0-12 5-12 12v98h-98c-7 0-12 5-12 12v12c0 7 5 12 12 12h98v98c0 7 5 12 12 12h12c7 0 12-5 12-12v-98h98c7 0 12-5 12-12v-12c0-7-5-12-12-12z"
                />
              </svg>
            ),
          },
        ],
      }}
    >
      <Grid container spacing={1}>
        {account.recipes.map(renderItem)}
      </Grid>
    </Layout>
  );
};

export default MainContainer;
