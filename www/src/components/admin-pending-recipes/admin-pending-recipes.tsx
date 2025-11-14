'use client';
import { CiCircleRemove, CiCircleCheck } from 'react-icons/ci';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  approveRecipe,
  denyRecipe,
  fetchPendingRecipes,
  type PendingRecipe,
} from '@/services/moderation.api';

export default function AdminPendingRecipes() {
  const [items, setItems] = useState<PendingRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPendingRecipes();
      setItems(data);
    } catch (e: any) {
      setError(e?.message || 'Falha ao carregar pendências');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onApprove = useCallback(async (id: number) => {
    try {
      await approveRecipe(id);
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch (e: any) {
      alert(e?.message || 'Falha ao aprovar');
    }
  }, []);

  const onDeny = useCallback(async (id: number) => {
    try {
      await denyRecipe(id);
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch (e: any) {
      alert(e?.message || 'Falha ao negar');
    }
  }, []);

  const body = useMemo(() => {
    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: 'var(--red-7)' }}>{error}</p>;
    if (items.length === 0) return <p>Sem receitas pendentes.</p>;
    return (
      <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0 }}>
        {items.map((r) => (
          <li
            key={r.id}
            style={{
              border: '1px solid var(--border-color, #eee)',
              borderRadius: 8,
              padding: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img
                  src={r.imgs?.[0] || '/logo.png'}
                  alt=""
                  width={48}
                  height={48}
                  style={{ objectFit: 'cover', borderRadius: 6 }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    #{r.id} • {new Date(r.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="button"
                  onClick={() => onDeny(r.id)}
                >
                  <CiCircleRemove /> Negar
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => onApprove(r.id)}
                >
                  <CiCircleCheck /> Aprovar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }, [loading, error, items, onApprove, onDeny]);

  return (
    <section className="grid" aria-labelledby="admin-pending-title">
      <div className="g-col-12">
        <h2 className="section-title" id="admin-pending-title">
          Aprovação de receitas
        </h2>
      </div>
      <div className="g-col-12">{body}</div>
    </section>
  );
}

