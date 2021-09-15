import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Image from '../image/image';
import ScoreComponent from '../score/score';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import Section from '../section/section';
import { RECIPE, Recipe } from '../../services/recipe';
import Container from '../container/container';
import { Food } from '../../services/food';

export interface RecipeContainerProps {
  recipe: Recipe;
  setCurrentFood(food: Food): void;
}

const RecipeContainer: FC<RecipeContainerProps> = ({
  recipe = RECIPE,
  setCurrentFood,
}) => {
  return (
    <>
      <Box marginBottom={3}>
        <Image src={recipe.image} alt="" aspectRatio={1.25} />
      </Box>
      <Container>
        <Grid container spacing={4}>
          {recipe.name && (
            <Grid item xs={12}>
              <Typography component="h2" variant="h1">
                {recipe.name}
              </Typography>
            </Grid>
          )}
          {recipe.description && (
            <Grid item xs={12}>
              <Typography>{recipe.description}</Typography>
            </Grid>
          )}
          {recipe.parts.map((part) => (
            <>
              <Typography variant="h2" component="h2" color="secondary">
                {part.name}
              </Typography>
              <Grid item xs={12}>
                <Ingredients
                  portions={part.portions}
                  setCurrentFood={setCurrentFood}
                />
              </Grid>
              <Grid item xs={12}>
                <Preparation preparation={part.preparation} />
              </Grid>
            </>
          ))}

          <Grid item xs={12}>
            <Typography variant="h2" component="h2" color="secondary">
              Informações nutricionais
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ScoreComponent recipe={recipe} />
          </Grid>
          <Grid item xs={12}>
            <Section title="Tabela de aminoácidos">
              <AminoAcidsTable aminoAcids={recipe.aminoAcids} />
            </Section>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RecipeContainer;
