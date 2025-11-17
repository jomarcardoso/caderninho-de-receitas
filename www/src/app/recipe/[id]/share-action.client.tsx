'use client';
import { CiShare1 } from 'react-icons/ci';
import { useShareRecipe } from '@/hooks/useShareRecipe';

export function ShareRecipeAction({ recipeId }: { recipeId: number }) {
  const { busy, onShare } = useShareRecipe(recipeId);
  return (
    <button
      type="button"
      aria-label="Compartilhar"
      title="Compartilhar"
      onClick={onShare}
      disabled={busy}
    >
      <span className="svg-icon">
        <CiShare1 />
      </span>
      enviar <br /> receita
    </button>
  );
}
