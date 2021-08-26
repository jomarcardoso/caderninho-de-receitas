import React, { FC, SyntheticEvent, useContext, useState } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from './card/card';
import { Meal } from '../services/meal';
import AccountContext from '../contexts/account-context';
import { borderSecondary, light } from './page/page';

const useStyles = makeStyles({
  cardLink: {
    display: 'flex',
    flex: 1,
  },
  card: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    ...borderSecondary,
  },
  cardBody: {
    flex: 1,
    backgroundColor: light,
  },
});

interface Props {
  meal: Meal;
  setMealId(id: number): void;
  setEditingMeal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MealCard: FC<Props> = ({ meal, setMealId, setEditingMeal }) => {
  const { setAccount } = useContext(AccountContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | null>();

  function handleClick(event: SyntheticEvent) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClickRemove() {
    setAccount?.removeMeal(meal.id);
    handleClose();
  }

  function handleClickLink() {
    setMealId(meal.id);
    setEditingMeal(false);
  }

  const mainIngredients = meal.portions.sort(
    (portionBefore, portionCurrent) =>
      portionCurrent.quantity - portionBefore.quantity,
  );

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={meal.image} variant="rounded" />
        }
        color="textSecondary"
        title={
          <a
            href="#meal-panel"
            onClick={handleClickLink}
            className={classes.cardLink}
          >
            <Typography variant="h2">{meal.name}</Typography>
          </a>
        }
        action={
          <div>
            <Button
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Link
                  to={`/meal#${meal.id}`}
                  state={{ meal }}
                  className={classes.cardLink}
                >
                  Ver receita
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClickRemove}>remover</MenuItem>
            </Menu>
          </div>
        }
      />
      {meal.description && (
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{meal.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      )}
      <Box bgcolor="grey.300" className={classes.cardBody}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h3" variant="h3">
                Ingredientes
              </Typography>
              <List dense>
                {mainIngredients.map((portion) => (
                  <ListItem>
                    <ListItemText>{portion.description}</ListItemText>
                  </ListItem>
                ))}
              </List>
              {meal.preparation && (
                <>
                  <Typography component="h3" variant="h3">
                    Modo de preparo
                  </Typography>
                  <Typography>{meal.preparation}</Typography>
                </>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Box>
      <CardContent>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item xs={12}>
            <Typography variant="h4">Calorias: {meal.calories}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MealCard;
