"use client";

import { useCallback, useContext, useState } from 'react';
import { DataContext } from '@/providers/data';
import { useRouter } from 'next/navigation';

export default function RecipeDeleteButton({ id }: { id: number }) {
  const { removeRecipe } = useContext(DataContext);
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onClick = useCallback(async () => {
    if (busy) return;
    if (!id) return;
    const ok = typeof window !== 'undefined' ? window.confirm('Excluir receita?') : true;
    if (!ok) return;
    setBusy(true);
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
      setBusy(false);
    }
  }, [busy, id, removeRecipe, router]);

  return (
    <button onClick={onClick} aria-disabled={busy} title="Excluir">
      <ion-icon name="trash-outline" />
    </button>
  );
}
