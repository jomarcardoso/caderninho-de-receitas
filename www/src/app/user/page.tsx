"use client";
import { useEffect, useState } from 'react';

interface FoodEditRequest {
  id: number;
  foodId: number;
  proposedBy: string;
  createdAt: string;
  status: number;
  payload: string;
}

function getApiBase(): string {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5106').replace(/\/$/, '');
  return base;
}

export default function UserPage() {
  const [pending, setPending] = useState<FoodEditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${getApiBase()}/api/food-edits/pending`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Falha ao carregar aprovações');
      const data = await res.json();
      setPending(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || 'Erro');
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function act(id: number, action: 'approve' | 'reject') {
    try {
      const res = await fetch(`${getApiBase()}/api/food-edits/${id}/${action}`, { method: 'POST' });
      if (!res.ok) throw new Error('Falha na ação');
      await load();
    } catch (e) {
      alert('Erro ao processar');
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Área do Usuário</h1>
      <section style={{ marginTop: 16 }}>
        <h2>Aprovações</h2>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !pending.length && <p>Nenhuma edição pendente.</p>}
        <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0 }}>
          {pending.map((p) => (
            <li key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Food #{p.foodId}</strong>
                <span>{new Date(p.createdAt).toLocaleString()}</span>
              </div>
              <div style={{ opacity: 0.8, fontSize: 13 }}>Proposto por: {p.proposedBy}</div>
              <details style={{ marginTop: 8 }}>
                <summary>Ver payload</summary>
                <pre style={{ overflowX: 'auto', background: '#fafafa', padding: 8 }}>{p.payload}</pre>
              </details>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={() => act(p.id, 'approve')}>Aprovar</button>
                <button onClick={() => act(p.id, 'reject')}>Rejeitar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

