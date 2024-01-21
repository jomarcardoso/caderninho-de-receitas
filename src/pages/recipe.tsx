import React, { FC, ReactElement } from 'react';
import { Grid, List, ListItem } from '@mui/material';
import { round } from 'lodash';
import DesktopHeader from '../components/desktop-header/desktop-header';
import NotebookTabs from '../components/notebook-tabs/notebook-tabs';
import '../styles/main.scss';
import SEO from '../components/seo';
import { RECIPE, Recipe } from '../services/recipe';
import Section from '../components/section/section';
import NutrientDisplay from '../components/nutrient/nutrient';
import { Nutrient } from '../services/nutrient.constants';
import AminoAcidsTable from '../components/aminoacids-table/aminoacids-table';
import { AminoAcidService } from '../services/amino-acid';

export interface RecipePageProps {
  recipe: Recipe;
}

const RecipePage: FC<RecipePageProps> = ({ recipe = RECIPE }) => {
  const hasVitamins = Object.values(recipe.vitamins).some(
    (vitamin) => vitamin.quantity,
  );

  const hasMinerals = Object.values(recipe.minerals).some(
    (mineral) => mineral.quantity,
  );

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

  function renderNutrient(nutrient: Nutrient): ReactElement | null {
    if (!nutrient.quantity) return null;

    return <NutrientDisplay nutrient={nutrient} key={nutrient.name} />;
  }

  return (
    <div className="container-desktop desktop-content">
      <div className="page relative" style={{ zIndex: 1 }}>
        <DesktopHeader />

        <Grid container>
          <Grid item xs={12} md={5}>
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
        </Grid>
      </div>

      <NotebookTabs
        tabs={[
          {
            children: 'alimentos',
            link: '/food',
          },
          {
            children: 'receitas',
            link: '/',
          },
          {
            active: true,
            children: 'cozinhar',
            link: '/recipe',
          },
        ]}
      />

      <SEO title="Caderninho de Receitas" />
    </div>
  );
};

export default RecipePage;
