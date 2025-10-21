import { recipeDtoToText, mapRecipeModelToDto } from 'services/recipe/recipe.service';
import type { Recipe } from 'services/recipe/recipe.model';
import type { RecipeDto } from 'services/recipe/recipe.dto';

function getApiBase(): string {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'http://localhost:5106').replace(/\/$/, '');
}

async function createShare(recipeId: number): Promise<{ url: string; publicUrl: string; slug: string } | null> {
  try {
    const res = await fetch(`${getApiBase()}/api/share/recipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { url: data.url as string, publicUrl: data.publicUrl as string, slug: data.slug as string };
  } catch {
    return null;
  }
}

async function shareLinkWithBody(recipe: Recipe | RecipeDto, language: 'pt' | 'en' = 'pt'): Promise<void> {
  const dto = mapRecipeModelToDto(recipe as any);
  const share = await createShare(dto.id || 0);
  const url = share?.url || `${window.location.origin}/recipe/${dto.id}`;
  const title = dto.name || 'Receita';
  const text = recipeDtoToText(dto, language);

  // Prefer Capacitor Share when available
  try {
    const mod = await import('@capacitor/share');
    await mod.Share.share({ title, text, url });
    return;
  } catch {}

  // Web Share API
  if (navigator.share) {
    try { await navigator.share({ title, text, url }); return; } catch {}
  }

  // Fallback: copia para área de transferência
  try { await navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url}`); } catch {}
}

async function shareLinkOnly(recipe: Recipe | RecipeDto): Promise<void> {
  const dto = mapRecipeModelToDto(recipe as any);
  const share = await createShare(dto.id || 0);
  const url = share?.url || `${window.location.origin}/recipe/${dto.id}`;
  const title = dto.name || 'Receita';

  try {
    const mod = await import('@capacitor/share');
    await mod.Share.share({ title, url });
    return;
  } catch {}

  if (navigator.share) {
    try { await navigator.share({ title, url }); return; } catch {}
  }

  try { await navigator.clipboard.writeText(url); } catch {}
}

export const AppShareService = { createShare, shareLinkWithBody, shareLinkOnly };

