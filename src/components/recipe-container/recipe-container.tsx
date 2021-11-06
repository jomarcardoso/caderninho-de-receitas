import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Image from '../image/image';
import ScoreComponent from '../score/score';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import Section from '../section/section';
import { RECIPE, Recipe } from '../../services/recipe';
import Container from '../container/container';
import { Food } from '../../services/food';
import { primary } from '../page/page';
import SectionCard from '../section-card/section-card';
import { AminoAcidService } from '../../services/amino-acid';

export interface RecipeContainerProps {
  recipe: Recipe;
  setCurrentFood(food: Food): void;
  setCurrentFoodQuantity(quantity: number): void;
}

const useStyles = makeStyles({
  name: {
    zIndex: 1,
    backgroundColor: `${primary.main}`,
    padding: '8px 0',
    color: 'white',
  },
  containerBody: {
    paddingLeft: 8,
    paddingRight: 8,
  },
});

const RecipeContainer: FC<RecipeContainerProps> = ({
  recipe = RECIPE,
  setCurrentFood,
  setCurrentFoodQuantity,
}) => {
  const classes = useStyles();

  return (
    <>
      {recipe.name && (
        <Box className={classes.name}>
          <Container>
            <Typography component="h2" variant="h1" color="inherit">
              {recipe.name}
            </Typography>
          </Container>
        </Box>
      )}
      <Box marginBottom={3}>
        <Image src={recipe.image} alt="" aspectRatio={1.25} />
      </Box>
      <Container className={classes.containerBody}>
        <Grid container spacing={4}>
          {recipe.description && (
            <Grid item xs={12}>
              <Typography>{recipe.description}</Typography>
            </Grid>
          )}
          {recipe.steps.map((step) => (
            <Grid item xs={12}>
              <SectionCard title={step.name}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Ingredients
                      ingredients={step.ingredients}
                      setCurrentFood={setCurrentFood}
                      setCurrentFoodQuantity={setCurrentFoodQuantity}
                    />
                  </Grid>
                  {step.preparation && (
                    <Grid item xs={12}>
                      <Preparation preparation={step.preparation} />
                    </Grid>
                  )}
                  {step.additional && (
                    <Grid item xs={12}>
                      <Typography>{step.additional}</Typography>
                    </Grid>
                  )}
                </Grid>
              </SectionCard>
            </Grid>
          ))}

          {recipe.additional && (
            <Grid item xs={12}>
              <Typography>{recipe.additional}</Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Typography variant="h2" component="h2" color="secondary">
              Informações nutricionais
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ScoreComponent recipe={recipe} />
          </Grid>
          {AminoAcidService.hasAminoAcid(recipe.aminoAcids) && (
            <Grid item xs={12}>
              <Section title="Tabela de aminoácidos">
                <AminoAcidsTable aminoAcids={recipe.aminoAcids} />
              </Section>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default RecipeContainer;