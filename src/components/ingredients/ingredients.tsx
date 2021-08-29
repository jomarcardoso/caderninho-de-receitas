import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Image from '../image';
import { Portion } from '../../services/portion/portion.types';
import Section from '../section/section';
import { Food } from '../../services/food';

interface Props {
  portions: Array<Portion>;
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
}

const Ingredients: FC<Props> = ({ portions = [], setCurrentFood }) => {
  return (
    <Section title="Ingredientes">
      <List>
        {portions.map((portion) => (
          <ListItem
            button
            disableGutters
            key={portion.food.id}
            onClick={() => setCurrentFood(portion.food)}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2} sm={1}>
                <Box bgcolor="white" padding={1}>
                  <Image
                    src={portion.food.icon}
                    alt={portion.food.name}
                    disableSpinner
                  />
                </Box>
              </Grid>
              <Grid item xs={10} sm={11}>
                <Typography>{portion.description}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Section>
  );
};

export default Ingredients;
