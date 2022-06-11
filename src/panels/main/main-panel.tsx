import React, { FC, useContext } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import capitalize from 'lodash/capitalize';
import Layout from '../../components/layout/layout';
import { Button } from '../../components/button';
import AccountContext from '../../contexts/account-context';
import { AccountAndSet, ACCOUNT } from '../../services/account.service';
import { RECIPE, Recipe, RecipeData } from '../../services/recipe';
import { recipes } from '../../db/partner-recipes';
import SectionTitle from '../../components/section-title/section-title';
import useScroll from '../../hooks/use-scroll';
import ChefSvg from '../../assets/svg/history/chef.svg';
import './main-panel.scss';
import { ListItem } from '../../components/list-item/list-item';
import UserContext from '../../contexts/user-context';
import { Avatar } from '../../components/avatar/avatar';

const useStyles = makeStyles({
  listItem: {
    padding: 0,
  },
  table: {
    marginBottom: 32,
    marginTop: 16,
  },
});

const MainPanel: FC<{
  setCurrentRecipe(recipe: Recipe): void;
  currentRecipeData: RecipeData;
}> = ({ setCurrentRecipe, currentRecipeData }) => {
  const { user } = useContext(UserContext);
  const { account = ACCOUNT }: AccountAndSet = useContext(AccountContext);
  const classes = useStyles();
  const alphabeticalRecipes = account.recipes.sort((a, b) => {
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
      currentPage="HOME"
      showHeader={false}
      footerProps={{
        items: [
          {
            onClick: () => setCurrentRecipe(RECIPE),
            icon: <IoAddCircleOutline />,
          },
        ],
      }}
      mainProps={{ pt: 5 }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Avatar src={user?.photoURL || ''} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SectionTitle>Minhas receitas</SectionTitle>
            </Grid>
            <Grid item xs={12}>
              <ol className="list">{alphabeticalRecipes.map(renderItem)}</ol>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="secondary"
                  contrast="light"
                  onClick={() => setCurrentRecipe(RECIPE)}
                >
                  <IoAddCircleOutline />
                  adicionar nova receita
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SectionTitle>Receitas de futuros parceiros</SectionTitle>
          <div className="main-panel__story-partner">
            <ChefSvg style={{ mixBlendMode: 'multiply' }} />
          </div>

          <Table className={classes.table} size="small">
            <TableBody>{recipes.map(renderItem)}</TableBody>
          </Table>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MainPanel;
