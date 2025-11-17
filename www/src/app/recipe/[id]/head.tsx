import { fetchApiJson } from '@/lib/api-server';
import { mapRecipeDataResponseToModel } from '@common/services/recipe';

async function fetchRecipeByHandle(handle: string) {
  try {
    const num = Number(handle);
    if (Number.isFinite(num)) {
      const raw = await fetchApiJson<any>(`/api/Recipe/${num}`, { cache: 'no-store' });
      return raw && typeof raw === 'object' ? mapRecipeDataResponseToModel(raw as any) : null;
    }
    const raw = await fetchApiJson<any>(
      `/api/share/recipe/${encodeURIComponent(handle)}/data`,
      { cache: 'no-store' },
    );
    return raw && typeof raw === 'object' ? mapRecipeDataResponseToModel(raw as any) : null;
  } catch {
    return null;
  }
}

export default async function Head({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchRecipeByHandle(id);

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
    .toString()
    .replace(/\/$/, '');

  const title = data?.recipe?.name ?? 'Receita';
  const description = data?.recipe?.description ?? '';
  const canonicalPath = `/recipe/${encodeURIComponent(id)}`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  const imgs: string[] = [
    ...((data?.recipe?.imgs ?? []) as string[]),
    ...((data?.recipe?.food?.imgs ?? []) as string[]),
  ].filter((s) => typeof s === 'string' && s.trim());

  const firstImg = imgs.length > 0 ? imgs[0] : '/logo.png';
  const absolutize = (u?: string) => {
    if (!u) return undefined;
    if (/^https?:\/\//i.test(u)) return u;
    const clean = u.startsWith('/') ? u : `/${u}`;
    return `${siteUrl}${clean}`;
  };
  const ogImage = absolutize(firstImg);

  return (
    <>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={canonicalPath} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={canonicalUrl} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
    </>
  );
}
