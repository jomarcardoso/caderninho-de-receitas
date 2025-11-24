'use client';
import { useCallback, useMemo, useState } from 'react';
import { CiShare1 } from 'react-icons/ci';
import Dialog from 'notebook-layout/components/dialog/dialog';
import { mapRecipeDataResponseToModel } from '@common/services/recipe';
import { appendAuthHeader } from '@common/services/auth/token.storage';

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5106'
)
  .toString()
  .trim()
  .replace(/\/$/, '');

type ShareData = { slug: string };

export function ShareRecipeAction({ recipeId }: { recipeId: number }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [slug, setSlug] = useState<string | undefined>();

  const shareLink = useMemo(() => {
    return slug
      ? `${window.location.origin}/recipe/${encodeURIComponent(slug)}`
      : '';
  }, [slug]);

  const ensureShare = useCallback(async () => {
    if (slug) return slug;
    setBusy(true);
    try {
      const headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      });
      appendAuthHeader(headers);
      const res = await fetch(`${API_BASE}/api/share/recipe`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ recipeId, isPublic: true }),
      });
      if (res.status === 401 || res.status === 403) {
        alert('Você precisa estar logado e ser o dono para compartilhar.');
        throw new Error('unauthorized');
      }
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        alert(`Falha ao preparar compartilhamento. ${text || ''}`);
        throw new Error('share_failed');
      }
      const data = (await res.json()) as ShareData;
      if (!data?.slug) throw new Error('invalid_slug');
      setSlug(data.slug);
      return data.slug;
    } finally {
      setBusy(false);
    }
  }, [recipeId, slug]);

  const onCopyLink = useCallback(async () => {
    try {
      const s = await ensureShare();
      const link = `${window.location.origin}/recipe/${encodeURIComponent(s)}`;
      await navigator.clipboard.writeText(link);
      alert('Link copiado para a área de transferência.');
      setOpen(false);
    } catch {}
  }, [ensureShare]);

  const fetchSharedData = useCallback(async (s: string) => {
    try {
      const res = await fetch(
        `/api/share/recipe/${encodeURIComponent(s)}/data`,
        {
          method: 'GET',
          headers: { accept: 'application/json' },
          cache: 'no-store',
        },
      );
      if (!res.ok) return null;
      const raw = (await res.json()) as any;
      try {
        return mapRecipeDataResponseToModel(raw as any);
      } catch {
        return raw as any;
      }
    } catch {
      return null;
    }
  }, []);

  const buildShareText = (data: any, link: string) => {
    const r = data?.recipe || {};
    const lines: string[] = [];

    // Nome em negrito (formatação tipo WhatsApp usa um asterisco)
    if (r.name) lines.push(`*${r.name}*`);

    // Descrição (se houver)
    if (r.description) lines.push('', String(r.description));

    // Link logo após a descrição (para melhor preview nos apps)
    lines.push('', link);

    // Ingredientes (preferir texto pronto ingredientsText dos passos)
    lines.push('', 'Ingredientes:');
    const steps = Array.isArray(r.steps) ? r.steps : [];
    const ingredientTextLines: string[] = [];
    steps.forEach((step: any) => {
      const t = step?.ingredientsText;
      if (t && typeof t === 'string') {
        String(t)
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((s) => ingredientTextLines.push(`- ${s}`));
      }
    });
    if (ingredientTextLines.length) {
      lines.push(ingredientTextLines.join('\n'));
    } else {
      const allIngredients: any[] = [];
      steps.forEach((step: any) => {
        const arr = Array.isArray(step?.ingredients) ? step.ingredients : [];
        allIngredients.push(...arr);
      });
      if (allIngredients.length) {
        allIngredients.forEach((ing: any) => {
          const qty = ing?.quantityText || '';
          const name = ing?.food?.name || ing?.foodName || '';
          if (name) lines.push(`- ${qty ? qty + ' ' : ''}${name}`);
        });
      }
    }

    // Modo de preparo (agregado dos passos)
    lines.push('', 'Modo de preparo:');
    const preparations: string[] = [];
    steps.forEach((step: any) => {
      if (step?.preparation) preparations.push(String(step.preparation));
    });
    if (preparations.length) lines.push(preparations.join('\n\n'));

    return lines.join('\n');
  };

  const onShareAsText = useCallback(async () => {
    try {
      const s = await ensureShare();
      const link = `${window.location.origin}/recipe/${encodeURIComponent(s)}`;
      const data = await fetchSharedData(s);
      const text = buildShareText(data, link);
      if ((navigator as any).share) {
        try {
          // Muitos destinos ignoram o 'text' quando 'url' é enviado.
          // Para garantir que o conteúdo completo seja enviado, incluímos o link dentro do próprio texto
          // e NÃO passamos 'url' aqui.
          await (navigator as any).share({
            title: data?.recipe?.name || 'Receita',
            text,
          });
          setOpen(false);
          return;
        } catch {
          // fallback abaixo
        }
      }
      await navigator.clipboard.writeText(text);
      alert('Texto da receita copiado para a área de transferência.');
      setOpen(false);
    } catch {}
  }, [ensureShare, fetchSharedData]);

  return (
    <>
      <button
        type="button"
        aria-label="Compartilhar"
        title="Compartilhar"
        onClick={() => setOpen(true)}
        disabled={busy}
      >
        <span className="svg-icon">
          <CiShare1 />
        </span>
        enviar <br /> receita
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Compartilhar receita"
        actions={
          <div className="d-flex gap-2 justify-content-end w-100">
            <button
              type="button"
              className="btn"
              onClick={() => setOpen(false)}
              disabled={busy}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn -primary"
              onClick={onCopyLink}
              disabled={busy}
            >
              Copiar link
            </button>
            <button
              type="button"
              className="btn -primary"
              onClick={onShareAsText}
              disabled={busy}
            >
              Enviar como texto
            </button>
          </div>
        }
      >
        <div className="grid columns-1 g-3">
          <p>Escolha como deseja compartilhar esta receita.</p>
          {slug && (
            <p style={{ wordBreak: 'break-word' }}>
              Link: <br />
              <small>{shareLink}</small>
            </p>
          )}
        </div>
      </Dialog>
    </>
  );
}
