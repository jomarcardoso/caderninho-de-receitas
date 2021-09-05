import React, { FC, SyntheticEvent, useContext, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Layout from '../../components/layout/layout';
import AccountContext from '../../contexts/account-context';
import { AccountAndSet, ACCOUNT } from '../../services/account.service';
import { Recipe } from '../../services/recipe';
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

const MainPanel: FC<{ setCurrentRecipe(recipe: Recipe): void }> = ({
  setCurrentRecipe,
}) => {
  const { account = ACCOUNT }: AccountAndSet = useContext(AccountContext);
  const [anchorElTools, setAnchorElTools] = useState<Element | null>();
  const classes = useStyles();

  function handleClickToolsMenu(event: SyntheticEvent) {
    setAnchorElTools(event.currentTarget);
  }

  function handleClose() {
    setAnchorElTools(null);
  }

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
      headerProps={{
        pageName: 'Caderninho de Receitas',
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
              <MenuItem>teste</MenuItem>
            </Menu>
          </>
        ),
      }}
    >
      <Grid container spacing={1}>
        {account.recipes.map(renderItem)}
      </Grid>
    </Layout>
  );
};

export default MainPanel;
