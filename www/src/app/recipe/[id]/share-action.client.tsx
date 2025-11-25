'use client';
import { useCallback, useMemo, useRef, useState } from 'react';
import { CiShare1 } from 'react-icons/ci';
import type { Recipe } from '@common/services/recipe';
import { appendAuthHeader } from '@common/services/auth/token.storage';
import { ShareDialog } from './share-dialog';
import { RecipePreview } from './recipe-preview';

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5106'
)
  .toString()
  .trim()
  .replace(/\/$/, '');

type ShareData = { slug: string };

export function ShareRecipeAction({
  recipeId,
  recipe,
}: {
  recipeId: number;
  recipe: Recipe;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [slug, setSlug] = useState<string | undefined>();
  const [imagePreview, setImagePreview] = useState<any | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();
  const cardRef = useRef<HTMLDivElement | null>(null);

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

  const buildShareText = (link: string) => {
    const pickText = (val: any) =>
      typeof val === 'string' ? val : val?.pt || val?.en || '';
    const r = recipe || ({} as any);
    const title = pickText(r.name);
    const description = pickText(r.description);

    const lines: string[] = [];
    if (title) lines.push(`*${title}*`);
    if (description) lines.push('', String(description));
    lines.push('', link);

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
          const name = pickText(ing?.food?.name) || ing?.foodName || '';
          if (name) lines.push(`- ${qty ? qty + ' ' : ''}${name}`);
        });
      }
    }

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
      const text = buildShareText(link);
      if ((navigator as any).share) {
        try {
          await (navigator as any).share({
            title: recipe?.name?.pt || recipe?.name?.en || 'Receita',
            text,
          });
          setOpen(false);
          return;
        } catch {
          // fallback below
        }
      }
      await navigator.clipboard.writeText(text);
      alert('Texto da receita copiado para a área de transferência.');
      setOpen(false);
    } catch {}
  }, [ensureShare, recipe]);

  const renderImagePreview = useCallback(() => {
    return (
      <RecipePreview recipe={recipe} cardRef={(el) => (cardRef.current = el)} />
    );
  }, [recipe]);

  const captureCard = useCallback(async () => {
    const html2canvas = (await import('html2canvas')).default;
    const el = cardRef.current;
    if (!el) return undefined;
    const canvas = await html2canvas(el, {
      useCORS: true,
      backgroundColor: '#fff',
      scale: 2,
      logging: false,
    });
    return canvas.toDataURL('image/png');
  }, []);

  const onSelectImage = useCallback(async () => {
    try {
      setImageLoading(true);
      setImageDataUrl(undefined);
      await ensureShare();
      setImagePreview({ recipe });
      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(null)),
      );
      if (!cardRef.current) {
        await new Promise((resolve) =>
          requestAnimationFrame(() => resolve(null)),
        );
      }
      const dataUrl = await captureCard();
      if (dataUrl) setImageDataUrl(dataUrl);
    } finally {
      setImageLoading(false);
    }
  }, [ensureShare, recipe, captureCard]);

  const onDownloadImage = useCallback(() => {
    if (!imageDataUrl) return;
    const a = document.createElement('a');
    a.href = imageDataUrl;
    a.download = 'receita-story.png';
    a.click();
  }, [imageDataUrl]);

  const onCopyImage = useCallback(async () => {
    if (!imageDataUrl || !(navigator.clipboard as any)?.write) {
      return onDownloadImage();
    }
    const res = await fetch(imageDataUrl);
    const blob = await res.blob();
    await (navigator.clipboard as any).write([
      new window.ClipboardItem({ [blob.type]: blob }),
    ]);
    alert('Imagem copiada para a área de transferência.');
  }, [imageDataUrl, onDownloadImage]);

  const onShareImage = useCallback(async () => {
    if (!imageDataUrl || !(navigator as any).share) {
      return onDownloadImage();
    }
    const res = await fetch(imageDataUrl);
    const blob = await res.blob();
    const file = new File([blob], 'receita-story.png', { type: blob.type });
    try {
      await (navigator as any).share({
        files: [file],
        title: 'Receita',
        text: 'Compartilhe sua receita',
      });
    } catch {
      // ignore
    }
  }, [imageDataUrl, onDownloadImage]);

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

      <ShareDialog
        open={open}
        busy={busy}
        shareLink={shareLink}
        slug={slug}
        imagePreview={renderImagePreview()}
        imageLoading={imageLoading}
        imageUrl={imageDataUrl}
        onClose={() => setOpen(false)}
        onCopyLink={onCopyLink}
        onShareText={onShareAsText}
        onSelectImage={onSelectImage}
        onCopyImage={onCopyImage}
        onDownloadImage={onDownloadImage}
        onShareImage={onShareImage}
      />
    </>
  );
}
