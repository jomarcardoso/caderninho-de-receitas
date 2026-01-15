import { recipeDtoToText, mapRecipeModelToDto } from 'services/recipe/recipe.service';
import type { Recipe } from 'services/recipe/recipe.model';
import type { RecipeDto } from 'services/recipe/recipe.dto';

function buildShareLink(recipe: Recipe | RecipeDto): string {
  const dto = mapRecipeModelToDto(recipe as any);
  const id = (recipe as any)?.id ?? (dto as any)?.id ?? 0;
  const origin = window.location.origin;
  if (!id) return origin;
  const base = `${origin}/recipe/${id}`;
  const shareToken = (recipe as any)?.shareToken;
  if (shareToken) {
    return `${base}?shareToken=${encodeURIComponent(String(shareToken))}`;
  }
  return base;
}

async function shareLinkWithBody(recipe: Recipe | RecipeDto, language: 'pt' | 'en' = 'pt'): Promise<void> {
  const dto = mapRecipeModelToDto(recipe as any);
  const url = buildShareLink(recipe);
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
  const url = buildShareLink(recipe);
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

export const AppShareService = { shareLinkWithBody, shareLinkOnly };
