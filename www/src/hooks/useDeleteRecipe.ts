'use client';

import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { DataContext } from '@/providers/data';
import { useRouter } from 'next/navigation';

export function useDeleteRecipe(params: {
  id: number;
  busy: boolean;
  setBusy?: Dispatch<SetStateAction<boolean>>;
}) {
  const { id, busy, setBusy } = params;
  const { removeRecipe } = useContext(DataContext);
  const router = useRouter();

  const onDelete = useCallback(async () => {
    if (busy) return;
    if (!id) return;
    const ok =
      typeof window !== 'undefined' ? window.confirm('Excluir receita?') : true;
    if (!ok) return;
    setBusy?.(true);
    try {
      removeRecipe?.(id);
      try {
        await fetch('/api/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tags: ['my-recipes', `recipe/${id}`] }),
        });
      } catch {}
      router.push('/my-recipes');
    } finally {
      setBusy?.(false);
    }
  }, [busy, id, removeRecipe, router, setBusy]);

  return { onDelete };
}
