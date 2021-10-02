import React, { FC, useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Layout from '../components/layout/layout';
import AccountContext from '../contexts/account-context';
import { AccountAndSet, ACCOUNT } from '../services/account.service';
import { RECIPE, Recipe } from '../services/recipe';
import { CurrentPage } from '../services/page.service';
import { fontFamilyInput } from '../components/page/page';

const useStyles = makeStyles({
  listItem: {
    borderBottom: '1px solid #000000aa',
    fontFamily: fontFamilyInput,
    lineHeight: 1,
    paddingBottom: 0,
    fontSize: 30,
    justifyContent: 'space-between',
  },
});

const MainPanel: FC<{ setCurrentRecipe(recipe: Recipe): void }> = ({
  setCurrentRecipe,
}) => {
  const { account = ACCOUNT }: AccountAndSet = useContext(AccountContext);
  const classes = useStyles();

  function handleClickLink(recipe: Recipe) {
    setCurrentRecipe(recipe);

    const elPage = document.querySelector('#root-content');

    elPage?.scrollTo({
      left: 9999,
      behavior: 'smooth',
    });
  }

  function renderItem(recipe: Recipe) {
    return (
      <ListItem
        key={recipe.id}
        disableGutters
        className={classes.listItem}
        component="a"
        onClick={() => handleClickLink(recipe)}
      >
        {recipe.name}
      </ListItem>
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
      <List>{account.recipes.map(renderItem)}</List>
    </Layout>
  );
};

export default MainPanel;
