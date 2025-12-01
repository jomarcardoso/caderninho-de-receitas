'use client';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import {
  approveFoodEdit,
  fetchPendingFoodEdits,
  rejectFoodEdit,
  type PendingFoodEditItem,
} from '@/services/moderation.api';

type ComparisonRow = {
  key: string;
  section: string;
  label: string;
  current?: string;
  proposed?: string;
};

function safeParse(payload: string): Record<string, any> {
  try {
    return JSON.parse(payload || '{}') ?? {};
  } catch {
    return {};
  }
}

function formatValue(value: any): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (Array.isArray(value)) {
    const filtered = value
      .map((item) => (item ?? '').toString().trim())
      .filter(Boolean);
    return filtered.length ? filtered.join(', ') : undefined;
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return undefined;
    return value.toLocaleString();
  }
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  const str = String(value).trim();
  return str.length ? str : undefined;
}

function humanizeKey(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());
}

function getCurrentMetric(section: any, key: string): any {
  if (!section) return undefined;
  const camel = key.charAt(0).toLowerCase() + key.slice(1);
  return section?.[camel] ?? section?.[key];
}

function hasLanguageInPayload(
  payload: Record<string, any>,
  prop: string,
  lang: 'pt' | 'en',
): boolean {
  const target = payload?.[prop];
  if (!target || typeof target !== 'object') return false;
  if (!Object.prototype.hasOwnProperty.call(target, lang)) return false;
  const value = target[lang];
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return true;
}

function describeDifference(row: ComparisonRow): string | undefined {
  const hasCurrent = !!row.current;
  const hasProposed = !!row.proposed;

  if (!hasCurrent && !hasProposed) return undefined;
  if (row.current === row.proposed) return 'Sem alteracao';
  if (!hasCurrent && hasProposed) return `Adicionar: ${row.proposed}`;
  if (hasCurrent && !hasProposed) return `Remover: ${row.current}`;
  return `Alterar: ${row.current} -> ${row.proposed}`;
}

function buildComparisonRows(edit: PendingFoodEditItem): ComparisonRow[] {
  const rows: ComparisonRow[] = [];
  const current = edit.currentFood ?? {};
  const proposed = safeParse(edit.payload);

  const isDeleteRequest =
    proposed?.delete === true ||
    (typeof proposed?.delete === 'string' &&
      proposed?.delete?.toLowerCase() === 'true');

  if (isDeleteRequest) {
    rows.push({
      key: 'action-delete',
      section: 'A��o',
      label: 'Solicita apagar este alimento',
      current: 'Manter alimento',
      proposed: 'Excluir alimento',
    });
    return rows;
  }

  const pushRow = (
    section: string,
    label: string,
    currentValue: any,
    proposedValue: any,
  ) => {
    const formattedCurrent = formatValue(currentValue);
    const formattedProposed = formatValue(proposedValue);
    if (!formattedCurrent && !formattedProposed) return;
    rows.push({
      key: `${section}-${label}`,
      section,
      label,
      current: formattedCurrent,
      proposed: formattedProposed,
    });
  };

  const textSections: Array<{
    section: string;
    prop: 'name' | 'description' | 'keys';
    lang: 'pt' | 'en';
    label: string;
  }> = [
    { section: 'Informacoes basicas', prop: 'name', lang: 'pt', label: 'Nome (PT)' },
    { section: 'Informacoes basicas', prop: 'name', lang: 'en', label: 'Nome (EN)' },
    { section: 'Informacoes basicas', prop: 'description', lang: 'pt', label: 'Descricao (PT)' },
    { section: 'Informacoes basicas', prop: 'description', lang: 'en', label: 'Descricao (EN)' },
    { section: 'Informacoes basicas', prop: 'keys', lang: 'pt', label: 'Keys (PT)' },
    { section: 'Informacoes basicas', prop: 'keys', lang: 'en', label: 'Keys (EN)' },
  ];

  textSections.forEach(({ section, prop, lang, label }) => {
    const currentValue = current?.[prop]?.[lang];
    const langInPayload = hasLanguageInPayload(proposed, prop, lang);
    const proposedValue = langInPayload ? proposed?.[prop]?.[lang] : currentValue;

    if (!langInPayload && formatValue(currentValue) === undefined) return;

    pushRow(section, label, currentValue, proposedValue);
  });

  pushRow('Informacoes basicas', 'Imagens', current?.imgs, proposed?.imgs);
  pushRow('Informacoes basicas', 'Icone ID', current?.iconId, proposed?.iconId);
  pushRow(
    'Informacoes basicas',
    'Icone (arquivo)',
    (current as any)?.iconName || current?.icon?.[0],
    proposed?.icon,
  );

  Object.entries(proposed?.nutritionalInformation ?? {}).forEach(
    ([key, value]) => {
      pushRow(
        'Informacoes nutricionais',
        humanizeKey(key),
        getCurrentMetric(current?.nutritionalInformation, key),
        value,
      );
    },
  );

  Object.entries(proposed?.minerals ?? {}).forEach(([key, value]) => {
    pushRow(
      'Minerais',
      humanizeKey(key),
      getCurrentMetric(current?.minerals, key),
      value,
    );
  });

  Object.entries(proposed?.aminoAcids ?? {}).forEach(([key, value]) => {
    pushRow(
      'Aminoacidos',
      humanizeKey(key),
      getCurrentMetric(current?.aminoAcids, key),
      value,
    );
  });

  return rows;
}
export default function AdminFoodEdits() {
  const [items, setItems] = useState<PendingFoodEditItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPendingFoodEdits();
      setItems(data);
    } catch (e: any) {
      setError(e?.message || 'Falha ao carregar alterações pendentes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onApprove = useCallback(async (id: number) => {
    try {
      await approveFoodEdit(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (e: any) {
      alert(e?.message || 'Falha ao aprovar alteração');
    }
  }, []);

  const onReject = useCallback(async (id: number) => {
    try {
      await rejectFoodEdit(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (e: any) {
      alert(e?.message || 'Falha ao rejeitar alteração');
    }
  }, []);

  const body = useMemo(() => {
    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: 'var(--red-7)' }}>{error}</p>;
    if (items.length === 0) return <p>Sem edições de alimentos pendentes.</p>;

    return (
      <ul style={{ display: 'grid', gap: 16, listStyle: 'none', padding: 0 }}>
        {items.map((edit) => {
          const proposed = safeParse(edit.payload);
          const isDeleteRequest =
            proposed?.delete === true ||
            (typeof proposed?.delete === 'string' &&
              proposed?.delete?.toLowerCase() === 'true');

          const rows = buildComparisonRows(edit);
          const grouped = rows.reduce<Record<string, ComparisonRow[]>>(
            (acc, row) => {
              acc[row.section] = acc[row.section] || [];
              acc[row.section].push(row);
              return acc;
            },
            {},
          );
          return (
            <li
              key={edit.id}
              style={{
                border: '1px solid var(--border-color, #eee)',
                borderRadius: 8,
                padding: 16,
              }}
            >
              <header
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>
                    Alimento #{edit.foodId} — pedido #{edit.id}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    Proposto por {edit.proposedBy} em{' '}
                    {new Date(edit.createdAt).toLocaleString()}
                  </div>
                  {isDeleteRequest && (
                    <div
                      style={{
                        marginTop: 4,
                        padding: '4px 8px',
                        borderRadius: 6,
                        background: '#fde2e2',
                        color: '#b22222',
                        fontSize: 12,
                        display: 'inline-block',
                      }}
                    >
                      Pedido de exclus�o do alimento
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="button"
                    onClick={() => onReject(edit.id)}
                  >
                    <CiCircleRemove /> Rejeitar
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => onApprove(edit.id)}
                  >
                    <CiCircleCheck /> Aprovar
                  </button>
                </div>
              </header>

              {rows.length > 0 ? (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: 'left',
                            padding: '6px 8px',
                            borderBottom: '1px solid var(--border-color, #eee)',
                          }}
                        >
                          Campo
                        </th>
                        <th
                          style={{
                            textAlign: 'left',
                            padding: '6px 8px',
                            borderBottom: '1px solid var(--border-color, #eee)',
                          }}
                        >
                          Atual
                        </th>
                        <th
                          style={{
                            textAlign: 'left',
                            padding: '6px 8px',
                            borderBottom: '1px solid var(--border-color, #eee)',
                          }}
                        >
                          Proposto
                        </th>
                        <th
                          style={{
                            textAlign: 'left',
                            padding: '6px 8px',
                            borderBottom: '1px solid var(--border-color, #eee)',
                          }}
                        >
                          Diferen�a
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(grouped).map(([section, sectionRows]) => (
                        <Fragment key={section}>
                          <tr>
                            <td
                              colSpan={4}
                              style={{
                                padding: '8px 8px',
                                background: 'var(--surface-2, #f7f7f7)',
                                fontWeight: 600,
                              }}
                            >
                              {section}
                            </td>
                          </tr>
                          {sectionRows.map((row) => {
                            const changed = row.proposed !== row.current;
                            const difference = describeDifference(row);
                            return (
                              <tr key={row.key}>
                                <td
                                  style={{
                                    padding: '6px 8px',
                                    borderBottom:
                                      '1px solid var(--border-color, #eee)',
                                  }}
                                >
                                  {row.label}
                                </td>
                                <td
                                  style={{
                                    padding: '6px 8px',
                                    borderBottom:
                                      '1px solid var(--border-color, #eee)',
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  {row.current ?? '-'}
                                </td>
                                <td
                                  style={{
                                    padding: '6px 8px',
                                    borderBottom:
                                      '1px solid var(--border-color, #eee)',
                                    fontFamily: 'monospace',
                                    color: changed
                                      ? 'var(--green-8, #0a8754)'
                                      : 'inherit',
                                  }}
                                >
                                  {row.proposed ?? '-'}
                                </td>
                                <td
                                  style={{
                                    padding: '6px 8px',
                                    borderBottom:
                                      '1px solid var(--border-color, #eee)',
                                    fontFamily: 'monospace',
                                    color: changed
                                      ? 'var(--green-8, #0a8754)'
                                      : 'inherit',
                                  }}
                                >
                                  {difference ?? '-'}
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ opacity: 0.7 }}>
                  Não foi possível identificar os campos alterados.
                </p>
              )}

              <details style={{ marginTop: 12 }}>
                <summary style={{ cursor: 'pointer' }}>
                  Ver JSON do pedido
                </summary>
                <pre
                  style={{
                    background: 'var(--surface-1, #f5f5f5)',
                    padding: 12,
                    marginTop: 8,
                    borderRadius: 6,
                    overflowX: 'auto',
                  }}
                >
                  {JSON.stringify(safeParse(edit.payload), null, 2)}
                </pre>
              </details>
            </li>
          );
        })}
      </ul>
    );
  }, [loading, error, items, onApprove, onReject]);

  return (
    <section className="grid" aria-labelledby="admin-food-edits-title">
      <div className="g-col-12">
        <h2 className="section-title" id="admin-food-edits-title">
          Aprovação de alimentos
        </h2>
      </div>
      <div className="g-col-12">{body}</div>
    </section>
  );
}
