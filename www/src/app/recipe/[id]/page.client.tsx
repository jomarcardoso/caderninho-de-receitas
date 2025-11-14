'use client';
import { CiCircleChevLeft } from 'react-icons/ci';
import { NavLink } from '@/components/nav-link/nav-link';
import { RecipeDetails } from '@/components/recipe-details/recipe-details';
import { useHistory } from '@/providers/history/history.provider';
import { Recipe } from '@common/services/recipe';
import { Button } from 'notebook-layout';
import { FC } from 'react';

export interface RecipePageClientProps {
  recipe: Recipe;
}

export const RecipePageClient: FC<RecipePageClientProps> = ({ recipe }) => {
  return (
    <>
      <RecipeDetails recipe={recipe} />

      <div className="d-flex justify-content-center mt-4">
        <NavLink action="pop" className="button button--secondary">
          <CiCircleChevLeft />
          voltar para página anterior
        </NavLink>
      </div>
    </>
  );
};

