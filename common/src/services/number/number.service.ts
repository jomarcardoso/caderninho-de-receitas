const DEFAULT_LOCALE =
  typeof navigator !== 'undefined' && navigator.language
    ? navigator.language
    : 'en-US';

const LANGUAGE_TO_LOCALE: Record<string, string> = {
  en: 'en-US',
  pt: 'pt-BR',
};

function resolveLocale(locale?: string): string {
  if (!locale || locale.trim() === '') {
    return DEFAULT_LOCALE;
  }

  const normalized = locale.toLowerCase();

  return LANGUAGE_TO_LOCALE[normalized] ?? locale;
}

export function roundToMaximumDecimals(
  value: number | string | null | undefined,
  maximumFractionDigits = 2,
): number | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  const numericValue =
    typeof value === 'number' ? value : Number(String(value).replace(/,/g, '.'));

  if (!Number.isFinite(numericValue)) {
    return undefined;
  }

  const factor = 10 ** Math.max(0, maximumFractionDigits);

  return Math.round((numericValue + Number.EPSILON) * factor) / factor;
}

export function formatNumber(
  value: number | null | undefined,
  locale?: string,
  options: Intl.NumberFormatOptions = {},
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '';
  }

  const resolvedLocale = resolveLocale(locale);
  const formatter = new Intl.NumberFormat(resolvedLocale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    ...options,
  });

  return formatter.format(value);
}
