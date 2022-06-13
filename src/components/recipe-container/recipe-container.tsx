import React, { FC, ReactElement } from 'react';
import round from 'lodash/round';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slide, { SlideProps } from '@mui/material/Slide';
import Container from '@mui/material/Container';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Image from '../image/image';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import Section from '../section/section';
import { RECIPE, Recipe } from '../../services/recipe';
import { Food } from '../../services/food';
import SectionCard from '../section-card/section-card';
import { AminoAcidService } from '../../services/amino-acid';
import NutrientDisplay from '../nutrient/nutrient';
import './recipe-container.scss';
import { Nutrient } from '../../services/nutrient.constants';

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
  const hasVitamins = Object.values(recipe.vitamins).some(
    (vitamin) => vitamin.quantity,
  );

  const hasMinerals = Object.values(recipe.minerals).some(
    (mineral) => mineral.quantity,
  );

  function renderNutrient(nutrient: Nutrient): ReactElement | null {
    if (!nutrient.quantity) return null;

    return (
      <ListItem disableGutters>
        <NutrientDisplay nutrient={nutrient} />
      </ListItem>
    );
  }

  function renderQuality({ name: foodName = '', value = 0 }) {
    if (!value) return null;

    return (
      <ListItem disableGutters>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item>
            <h2>{foodName}</h2>
          </Grid>
          <Grid item>{round(value, 2)}</Grid>
        </Grid>
      </ListItem>
    );
  }

  return (
    <Box className="recipe-container">
      {recipe.name && (
        <HideOnScroll>
          <Box className="recipe-container__name">
            <Container>
              <h2
                className="h2"
                style={{ fontSize: recipe.name.length > 30 ? 17 : 19 }}
              >
                {recipe.name}
              </h2>
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
              {recipe.description}
            </Grid>
          )}
          {recipe.steps.map((step) => (
            <Grid item xs={12}>
              <SectionCard title={step.name}>
                <Grid container spacing={4}>
                  {step.ingredients.length ? (
                    <Grid item xs={12}>
                      <Ingredients
                        ingredients={step.ingredients}
                        setCurrentFood={setCurrentFood}
                        setCurrentFoodQuantity={setCurrentFoodQuantity}
                      />
                    </Grid>
                  ) : (
                    ''
                  )}
                  {step.preparation && (
                    <Grid item xs={12}>
                      <Preparation
                        preparation={step.preparation}
                        title={step.ingredients.length ? undefined : ''}
                      />
                    </Grid>
                  )}
                  {step.additional && (
                    <Grid item xs={12}>
                      {step.additional}
                    </Grid>
                  )}
                </Grid>
              </SectionCard>
            </Grid>
          ))}

          {recipe.additional && (
            <Grid item xs={12}>
              {recipe.additional}
            </Grid>
          )}

          <Grid item xs={12}>
            <h2 className="h2">Informações nutricionais</h2>
          </Grid>

          <Grid item xs={12}>
            <List>
              {renderQuality({
                name: 'Calorias',
                value: recipe.calories,
              })}
              {renderQuality({
                name: 'Carboidratos',
                value: recipe.carbohydrates,
              })}
              {renderQuality({
                name: 'Proteínas',
                value: recipe.proteins,
              })}
              {renderQuality({
                name: 'Gorduras totais',
                value: recipe.totalFat,
              })}
              {renderQuality({
                name: 'Fibras',
                value: recipe.dietaryFiber,
              })}
            </List>
          </Grid>

          {hasVitamins && (
            <Grid item xs={12}>
              <Section title="Vitaminas">
                <List>
                  {Object.values(recipe.vitamins).map(renderNutrient)}
                </List>
              </Section>
            </Grid>
          )}

          {hasMinerals && (
            <Grid item xs={12}>
              <Section title="Minerais">
                <List>
                  {Object.values(recipe.minerals).map(renderNutrient)}
                </List>
              </Section>
            </Grid>
          )}

          {AminoAcidService.verifyHasAminoAcid(recipe.aminoAcids) && (
            <Grid item xs={12}>
              <AminoAcidsTable
                contrast="light"
                aminoAcids={recipe.aminoAcids}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default RecipeContainer;
