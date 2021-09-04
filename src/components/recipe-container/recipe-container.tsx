import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Image from '../image';
import ScoreComponent from '../score';
import AminoAcidsTable from '../aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import Section from '../section/section';
import { RECIPE, Recipe } from '../../services/recipe';
import Container from '../container/container';
import { Food } from '../../services/food';

export interface RecipeContainerProps {
  recipe: Recipe;
  setCurrentFood(food: Food): void;
  onNewRecipe(): void;
}

const useStyles = makeStyles({
  buttonNew: {
    position: 'sticky',
    bottom: 15,
    right: 0,
    display: 'flex',
    marginLeft: 'auto',
    marginTop: 15,
  },
});

const RecipeContainer: FC<RecipeContainerProps> = ({
  recipe = RECIPE,
  setCurrentFood,
  onNewRecipe,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box marginBottom={3}>
        <Image src={recipe.image} alt="" aspectRatio={1.25} />
      </Box>
      <Container>
        <Grid container spacing={4}>
          {recipe.description && (
            <Grid item xs={12}>
              <Typography>{recipe.description}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Ingredients
              portions={recipe.portions}
              setCurrentFood={setCurrentFood}
            />
          </Grid>
          <Grid item xs={12}>
            <Preparation preparation={recipe.preparation} />
          </Grid>

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
        <Fab
          size="small"
          color="primary"
          aria-label="nova receita"
          className={classes.buttonNew}
          onClick={onNewRecipe}
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
};

export default RecipeContainer;
