'use client';

import { Button, Field } from 'notebook-layout';
import { useCallback, useMemo, useState } from 'react';

function getApiBase(): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5106';
  return base.replace(/\/$/, '');
}

export default function FoodBulkUploader() {
  const [jsonText, setJsonText] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const placeholder = useMemo(
    () =>
      `[
  {
    "name": { "pt": "Ovo cozido" },
    "group": "Proteínas",
    "energyKcal": 155
  }
]`,
    [],
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setError(null);
      setResult(null);
      try {
        const parsed = JSON.parse(jsonText || '[]');
        const payload = Array.isArray(parsed) ? parsed : [parsed];

        const res = await fetch(`${getApiBase()}/api/food/many`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const text = await res.text();
        if (!res.ok) throw new Error(text || `Erro ${res.status}`);

        setResult(text || 'OK');
        setJsonText('');
      } catch (err: any) {
        setError(err?.message || 'Falha ao enviar');
      } finally {
        setSubmitting(false);
      }
    },
    [jsonText],
  );

  return (
    <section className="grid" aria-labelledby="food-bulk-title">
      <div className="g-col-12">
        <h2 className="section-title" id="food-bulk-title">
          Importar Alimentos (JSON)
        </h2>
      </div>

      <div className="g-col-12">
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <label htmlFor="food-bulk-text">
            Cole abaixo o JSON (array ou item único):
          </label>
          <Field
            multiline
            id="food-bulk-text"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={placeholder}
            rows={10}
            style={{ fontFamily: 'monospace' }}
          />

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Button type="submit" disabled={submitting} className="btn">
              {submitting ? 'Enviando...' : 'Enviar para /api/food/many'}
            </Button>
            {result && (
              <span style={{ color: 'var(--green-7)' }}>Sucesso: {result}</span>
            )}
            {error && (
              <span style={{ color: 'var(--red-7)' }}>Erro: {error}</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
