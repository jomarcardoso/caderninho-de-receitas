import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from '../image/image';
import { Ingredient } from '../../services/ingredient/ingredient.types';
import { Food } from '../../services/food';
import Section from '../section/section';

interface Props {
  ingredients: Array<Ingredient>;
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const Ingredients: FC<Props> = ({
  ingredients = [],
  setCurrentFood,
  setCurrentFoodQuantity,
}) => {
  function handleClick(ingredient: Ingredient) {
    setCurrentFood(ingredient.food);
    setCurrentFoodQuantity(ingredient.quantity);
  }

  return (
    <Section title="Ingredientes" onBgWhite>
      <List>
        {ingredients.map((ingredient) => (
          <ListItem
            button
            disableGutters
            key={`${ingredient.food.id}${ingredient.quantity}`}
            onClick={() => handleClick(ingredient)}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={1}>
                <Image
                  src={ingredient.food.icon || ingredient.food.image}
                  alt={ingredient.food.name}
                />
              </Grid>
              <Grid item xs={11}>
                <Typography>{ingredient.description}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Section>
  );
};

export default Ingredients;
