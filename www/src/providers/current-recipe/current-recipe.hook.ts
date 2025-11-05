'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DataContext } from '../data/data.context';
import type { CurrentRecipeContextProps } from './current-recipe.context';
import { STORAGE_CURRENT_RECIPE } from '@/services/storage/storage.service';
import { StorageService } from '@/services/storage';
import { mapRecipeModelToDto } from '@common/services/recipe';

let initialRecipeId = 0;

if (typeof window !== 'undefined') {
  const editingRecipeId = localStorage.getItem(STORAGE_CURRENT_RECIPE);

  if (editingRecipeId) {
    initialRecipeId = Number(editingRecipeId);
  }
}

export const useRecipe = (): CurrentRecipeContextProps => {
  const [currentRecipeId, setCurrentRecipeId] = useState(0);
  const {
    data: { recipes },
  } = useContext(DataContext);

  useEffect(() => {
    if (currentRecipeId) {
      StorageService.setCurrentRecipeId(currentRecipeId);
    }
  }, [currentRecipeId]);

  const currentRecipeDto = useMemo(() => {
    const recipe = recipes.find((recipe) => recipe.id === currentRecipeId);

    if (recipe) {
      return mapRecipeModelToDto(recipe);
    }
  }, [currentRecipeId, recipes]);

  return {
    currentRecipeDto,
    currentRecipeId,
    setCurrentRecipeId,
  };
};
