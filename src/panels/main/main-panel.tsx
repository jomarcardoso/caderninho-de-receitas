import React, { FC, useContext } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import capitalize from 'lodash/capitalize';
import Layout from '../../components/layout/layout';
import Button from '../../components/button/button';
import AccountContext from '../../contexts/account-context';
import { AccountAndSet, ACCOUNT } from '../../services/account.service';
import { RECIPE, Recipe } from '../../services/recipe';
import { recipes } from '../../db/partner-recipes';
import SectionTitle from '../../components/section-title/section-title';
import useScroll from '../../hooks/use-scroll';
import ChefSvg from '../../assets/svg/history/chef.svg';
import './main-panel.scss';

const useStyles = makeStyles({
  listItem: {
    padding: 0,
  },
  table: {
    marginBottom: 32,
    marginTop: 16,
  },
});

const MainPanel: FC<{ setCurrentRecipe(recipe: Recipe): void }> = ({
  setCurrentRecipe,
}) => {
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
      <li
        // eslint-disable-next-line
        tabIndex={0}
        onClick={() => handleClickLink(recipe)}
        className="list__item"
      >
        {capitalize(recipe.name)}
      </li>
    );
  }

  return (
    <Layout
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
      mainProps={{ my: 5 }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionTitle>Minhas receitas</SectionTitle>
          <ol className="list">{alphabeticalRecipes.map(renderItem)}</ol>
          <Box display="flex" justifyContent="center">
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => setCurrentRecipe(RECIPE)}
            >
              <IoAddCircleOutline />
              adicionar nova receita
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <SectionTitle>Receitas de futuros parceiros</SectionTitle>
          <div className="main-panel__story-partner">
            <ChefSvg />
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
