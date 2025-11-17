'use client';
import { useState } from 'react';

const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5106')
    .toString()
    .trim()
    .replace(/\/$/, '');

export function useShareRecipe(recipeId: number) {
  const [busy, setBusy] = useState(false);

  async function onShare() {
    if (!recipeId) return;
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/share/recipe`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ recipeId, isPublic: true }),
      });

      if (res.status === 401 || res.status === 403) {
        alert('Você precisa estar logado/dono para compartilhar esta receita.');
        return;
      }
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        alert(`Falha ao compartilhar a receita. ${text || ''}`);
        return;
      }

      const data = (await res.json()) as { slug: string };
      const slug = (data as any)?.slug as string | undefined;
      if (!slug) {
        alert('Não foi possível gerar o link de compartilhamento.');
        return;
      }

      // Link de compartilhamento sempre como /recipe/{slug}
      const link = `${window.location.origin}/recipe/${encodeURIComponent(slug)}`;
      try {
        await navigator.clipboard.writeText(link);
        alert('Link de compartilhamento copiado para a área de transferência.');
      } catch {
        prompt('Copie o link de compartilhamento:', link);
      }
    } catch (e) {
      console.error(e);
      alert('Não foi possível compartilhar a receita agora.');
    } finally {
      setBusy(false);
    }
  }

  return { busy, onShare };
}
