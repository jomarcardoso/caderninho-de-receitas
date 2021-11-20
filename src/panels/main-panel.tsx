import React, { FC, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import ListItemText from '@mui/material/ListItemText';
import TableRow from '@mui/material/TableRow';
import capitalize from 'lodash/capitalize';
import Layout from '../components/layout/layout';
import AccountContext from '../contexts/account-context';
import { AccountAndSet, ACCOUNT } from '../services/account.service';
import { RECIPE, Recipe } from '../services/recipe';
import { recipes } from '../db/recipe';
import SectionTitle from '../components/section-title/section-title';

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

  function handleClickLink(recipe: Recipe) {
    setCurrentRecipe(recipe);
  }

  function renderItem(recipe: Recipe) {
    return (
      <TableRow key={recipe.id}>
        <TableCell component="th" scope="row">
          <ListItem
            className={classes.listItem}
            button
            onClick={() => handleClickLink(recipe)}
          >
            <ListItemText primary={capitalize(recipe.name)} />
          </ListItem>
        </TableCell>
      </TableRow>
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
      {account.recipes.length && (
        <>
          <SectionTitle>Minhas receitas</SectionTitle>
          <TableContainer>
            <Table className={classes.table} size="small">
              <TableBody>{account.recipes.map(renderItem)}</TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <SectionTitle>Receitas de futuros parceiros</SectionTitle>
      <Table className={classes.table} size="small">
        <TableBody>{recipes.map(renderItem)}</TableBody>
      </Table>
    </Layout>
  );
};

export default MainPanel;
