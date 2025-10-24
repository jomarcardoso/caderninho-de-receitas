"use client";
import { useEffect, useMemo, useState } from 'react';

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

type Flat = Record<string, string>;

function flatten(obj: any, prefix = ''): Flat {
  const out: Flat = {};
  if (obj == null) return out;
  const isPlain = (v: any) => Object.prototype.toString.call(v) === '[object Object]';
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      out[key] = JSON.stringify(v);
      v.forEach((it, i) => {
        out[`${key}[${i}]`] = typeof it === 'object' ? JSON.stringify(it) : String(it);
      });
    } else if (isPlain(v)) {
      Object.assign(out, flatten(v as any, key));
    } else if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      out[key] = String(v);
    } else if (v == null) {
      out[key] = '';
    } else {
      out[key] = String(v);
    }
  }
  return out;
}

function diffFlat(before: Flat, after: Flat) {
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  const rows: { path: string; before?: string; after?: string }[] = [];
  for (const k of Array.from(keys).sort()) {
    const b = before[k];
    const a = after[k];
    if ((b ?? '') !== (a ?? '')) rows.push({ path: k, before: b, after: a });
  }
  return rows;
}

export default function UserPage() {
  const [pending, setPending] = useState<FoodEditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [diffs, setDiffs] = useState<Record<number, { rows: { path: string; before?: string; after?: string }[] }>>({});
  const [showCurrent, setShowCurrent] = useState<Record<number, boolean>>({});
  const [showProposed, setShowProposed] = useState<Record<number, boolean>>({});
  const [currentJson, setCurrentJson] = useState<Record<number, string>>({});

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

  async function toggleCurrentJson(item: FoodEditRequest) {
    const id = item.id;
    setShowCurrent((m) => ({ ...m, [id]: !m[id] }));
    if (currentJson[id]) return;
    try {
      const res = await fetch(`${getApiBase()}/api/food/${item.foodId}`, { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      setCurrentJson((m) => ({ ...m, [id]: JSON.stringify(data, null, 2) }));
    } catch {}
  }

  async function toggleAndLoadDiff(p: FoodEditRequest) {
    setExpanded((m) => ({ ...m, [p.id]: !m[p.id] }));
    if (diffs[p.id]) return;
    try {
      // current food
      const res = await fetch(`${getApiBase()}/api/food/${p.foodId}`, { cache: 'no-store' });
      if (!res.ok) return;
      const current = await res.json();
      // proposed
      let proposed: any = {};
      try { proposed = JSON.parse(p.payload || '{}'); } catch { proposed = {}; }

      // flatten both and diff
      const before = flatten(current);
      const after = flatten(proposed);
      const rows = diffFlat(before, after);
      setDiffs((m) => ({ ...m, [p.id]: { rows } }));
    } catch {}
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
              <div style={{ marginTop: 8 }}>
                <button onClick={() => toggleAndLoadDiff(p)} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>
                  {expanded[p.id] ? 'Esconder diferenças' : 'Ver diferenças'}
                </button>
              </div>
              {expanded[p.id] && (
                <div style={{ marginTop: 10 }}>
                  {diffs[p.id]?.rows?.length ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 6 }}>Campo</th>
                          <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 6 }}>Atual</th>
                          <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 6 }}>Proposto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {diffs[p.id].rows.map((r) => (
                          <tr key={r.path}>
                            <td style={{ verticalAlign: 'top', borderBottom: '1px solid #f4f4f4', padding: 6, whiteSpace: 'nowrap' }}>{r.path}</td>
                            <td style={{ verticalAlign: 'top', borderBottom: '1px solid #f4f4f4', padding: 6 }}><code>{r.before ?? ''}</code></td>
                            <td style={{ verticalAlign: 'top', borderBottom: '1px solid #f4f4f4', padding: 6 }}><code>{r.after ?? ''}</code></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div style={{ opacity: 0.7 }}>Sem diferenças detectadas.</div>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button
                      type="button"
                      onClick={() => toggleCurrentJson(p)}
                      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                    >
                      {showCurrent[p.id] ? 'Esconder JSON atual' : 'Ver JSON atual (formatado)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProposed((m) => ({ ...m, [p.id]: !m[p.id] }))}
                      style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                    >
                      {showProposed[p.id] ? 'Esconder JSON proposto' : 'Ver JSON proposto (formatado)'}
                    </button>
                  </div>
                  {showCurrent[p.id] && (
                    <pre style={{ overflowX: 'auto', background: '#fafafa', padding: 8, marginTop: 8 }}>
                      {currentJson[p.id] || ''}
                    </pre>
                  )}
                  {showProposed[p.id] && (
                    <pre style={{ overflowX: 'auto', background: '#fafafa', padding: 8, marginTop: 8 }}>
                      {(() => { try { return JSON.stringify(JSON.parse(p.payload || '{}'), null, 2); } catch { return p.payload; } })()}
                    </pre>
                  )}
                </div>
              )}
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
