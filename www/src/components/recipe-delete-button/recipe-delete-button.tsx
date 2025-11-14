'use client';
import { CiTrash } from 'react-icons/ci';

import { useContext, useState } from 'react';
import { useDeleteRecipe } from '@/hooks/useDeleteRecipe';
import LoadingContext from '@/providers/loading/loading.context';

export default function RecipeDeleteButton({ id }: { id: number }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const { onDelete } = useDeleteRecipe({
    id,
    busy: loading,
    setBusy: setLoading,
  });

  return (
    <button onClick={onDelete} aria-disabled={loading} title="Excluir">
      <CiTrash className="svg-icon" />
      apagar <br /> receita
    </button>
  );
}
