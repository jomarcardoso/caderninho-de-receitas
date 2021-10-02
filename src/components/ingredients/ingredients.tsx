import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Image from '../image/image';
import { Ingredient } from '../../services/ingredient/ingredient.types';
import { Food } from '../../services/food';
import Section from '../section/section';

interface Props {
  ingredients: Array<Ingredient>;
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
}

const Ingredients: FC<Props> = ({ ingredients = [], setCurrentFood }) => {
  return (
    <Section title="Ingredientes" onBgWhite>
      <List>
        {ingredients.map((ingredient) => (
          <ListItem
            button
            disableGutters
            key={ingredient.food.id}
            onClick={() => setCurrentFood(ingredient.food)}
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
