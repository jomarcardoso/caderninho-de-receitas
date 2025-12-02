'use client';
import { useEffect, useState, useCallback } from 'react';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import {
  fetchPendingCategoryEdits,
  approveCategoryEdit,
  rejectCategoryEdit,
  type PendingCategoryEdit,
} from '@/services/category-edits.api';

function safeParse(payload: string): Record<string, any> {
  try {
    return JSON.parse(payload || '{}') ?? {};
  } catch {
    return {};
  }
}

export default function AdminCategoryEdits() {
  const [items, setItems] = useState<PendingCategoryEdit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchPendingCategoryEdits();
      setItems(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setError(e?.message || 'Falha ao carregar edições de categoria');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onApprove = useCallback(async (id: number) => {
    try {
      await approveCategoryEdit(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      alert(e?.message || 'Falha ao aprovar edição');
    }
  }, []);

  const onReject = useCallback(async (id: number) => {
    try {
      await rejectCategoryEdit(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      alert(e?.message || 'Falha ao rejeitar edição');
    }
  }, []);

  if (loading) return <p>Carregando edições de categorias...</p>;
  if (error) return <p style={{ color: 'var(--red-7)' }}>{error}</p>;
  if (items.length === 0) return <p>Sem edições de categorias pendentes.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
      {items.map((item) => {
        const payload = safeParse(item.payload);
        return (
          <li
            key={item.id}
            style={{
              border: '1px solid var(--border-color, #eee)',
              borderRadius: 8,
              padding: 12,
            }}
          >
            <header
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 8,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>
                  Categoria #{item.categoryId} — pedido #{item.id}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  Proposto por {item.proposedBy} em {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" className="button" onClick={() => onReject(item.id)}>
                  <CiCircleRemove /> Rejeitar
                </button>
                <button type="button" className="button" onClick={() => onApprove(item.id)}>
                  <CiCircleCheck /> Aprovar
                </button>
              </div>
            </header>

            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: 'pointer' }}>Ver payload</summary>
              <pre
                style={{
                  background: 'var(--surface-1, #f5f5f5)',
                  padding: 10,
                  borderRadius: 6,
                  overflowX: 'auto',
                }}
              >
                {JSON.stringify(payload, null, 2)}
              </pre>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
