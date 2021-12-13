import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slide, { SlideProps } from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Image from '../image/image';
import ScoreComponent from '../score/score';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import Section from '../section/section';
import { RECIPE, Recipe } from '../../services/recipe';
import Container from '../container/container';
import { Food } from '../../services/food';
import SectionCard from '../section-card/section-card';
import { AminoAcidService } from '../../services/amino-acid';
import './recipe-container.scss';

const HideOnScroll: FC<SlideProps> = ({ children, ...props }) => {
  const trigger = useScrollTrigger({
    target: document.querySelector('#recipe-panel') as HTMLElement,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger} {...props}>
      {children}
    </Slide>
  );
};

export interface RecipeContainerProps {
  recipe: Recipe;
  setCurrentFood(food: Food): void;
  setCurrentFoodQuantity(quantity: number): void;
}

const RecipeContainer: FC<RecipeContainerProps> = ({
  recipe = RECIPE,
  setCurrentFood,
  setCurrentFoodQuantity,
}) => {
  return (
    <div className="recipe-container">
      {recipe.name && (
        <HideOnScroll>
          <Box className="recipe-container__name">
            <Container>
              <Typography component="h2" variant="h1" color="inherit">
                {recipe.name}
              </Typography>
            </Container>
          </Box>
        </HideOnScroll>
      )}
      <Box marginBottom={3}>
        <Image src={recipe.image} alt="" aspectRatio={1.25} />
      </Box>
      <Container className="recipe-container__body">
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
          {AminoAcidService.verifyHasAminoAcid(recipe.aminoAcids) && (
            <Grid item xs={12}>
              <Section title="Tabela de aminoácidos">
                <AminoAcidsTable aminoAcids={recipe.aminoAcids} />
              </Section>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default RecipeContainer;
