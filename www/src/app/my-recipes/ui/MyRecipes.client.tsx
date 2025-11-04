"use client";

import { useEffect, useMemo, useState } from 'react';
import {
  addRecipeToList,
  createRecipeList,
  deleteRecipeList,
  getRecipeList,
  getRecipeLists,
  removeRecipeFromList,
  type RecipeList,
  type RecipeListItem,
} from '@/services/recipe-lists.service';

export default function MyRecipesClient() {
  const [lists, setLists] = useState<RecipeList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selected, setSelected] = useState<RecipeList | null>(null);

  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [addRecipeId, setAddRecipeId] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);

  async function reloadLists() {
    setLoading(true);
    setError('');
    try {
      const data = await getRecipeLists();
      setLists(data);
    } catch (e: any) {
      setError(e?.message || 'Falha ao carregar listas');
    } finally {
      setLoading(false);
    }
  }

  async function selectList(id: number) {
    setSelectedId(id);
    setSelected(null);
    setError('');
    try {
      const data = await getRecipeList(id);
      setSelected(data);
    } catch (e: any) {
      setError(e?.message || 'Falha ao carregar lista');
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setBusy(true);
    setError('');
    try {
      await createRecipeList(newName.trim(), newDesc.trim() || undefined);
      setNewName('');
      setNewDesc('');
      await reloadLists();
    } catch (e: any) {
      setError(e?.message || 'Falha ao criar lista');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Excluir esta lista?')) return;
    setBusy(true);
    setError('');
    try {
      await deleteRecipeList(id);
      if (selectedId === id) {
        setSelectedId(null);
        setSelected(null);
      }
      await reloadLists();
    } catch (e: any) {
      setError(e?.message || 'Falha ao excluir lista');
    } finally {
      setBusy(false);
    }
  }

  async function handleAddRecipe(e: React.FormEvent) {
    e.preventDefault();
    const id = Number(addRecipeId);
    if (!selectedId || !Number.isFinite(id) || id <= 0) return;
    setBusy(true);
    setError('');
    try {
      await addRecipeToList(selectedId, id);
      setAddRecipeId('');
      await selectList(selectedId);
    } catch (e: any) {
      setError(e?.message || 'Falha ao adicionar receita');
    } finally {
      setBusy(false);
    }
  }

  async function handleRemoveRecipe(recipeId: number) {
    if (!selectedId) return;
    setBusy(true);
    setError('');
    try {
      await removeRecipeFromList(selectedId, recipeId);
      await selectList(selectedId);
    } catch (e: any) {
      setError(e?.message || 'Falha ao remover receita');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    reloadLists();
  }, []);

  const body = useMemo(() => {
    if (loading) return <p>Carregando...</p>;
    if (error) return <p style={{ color: 'var(--color-danger, #b00)' }}>{error}</p>;

    return (
      <div className="grid columns-1 g-6">
        <section>
          <h2 className="h3" style={{ marginBottom: 8 }}>Criar nova lista</h2>
          <form onSubmit={handleCreate} className="grid columns-1 g-2" style={{ maxWidth: 420 }}>
            <input
              type="text"
              placeholder="Nome da lista"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              style={{ padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8 }}
            />
            <input
              type="text"
              placeholder="Descrição (opcional)"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              style={{ padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8 }}
            />
            <button type="submit" disabled={busy} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}>
              Criar lista
            </button>
          </form>
        </section>

        <section>
          <h2 className="h3" style={{ marginBottom: 8 }}>Minhas listas</h2>
          {lists.length === 0 && <p>Nenhuma lista criada.</p>}
          <ul className="list" style={{ maxWidth: 560 }}>
            {lists.map((l) => (
              <li key={l.id} className="list-item -no-gutters" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => selectList(l.id)} style={{ padding: 8, borderRadius: 6, border: '1px solid #eee' }}>
                  Abrir
                </button>
                <strong style={{ flex: 1 }}>{l.name}</strong>
                {l.description && <span style={{ opacity: 0.8 }}>{l.description}</span>}
                <button onClick={() => handleDelete(l.id)} style={{ padding: 8, borderRadius: 6, border: '1px solid #eee' }}>
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </section>

        {selectedId && (
          <section>
            <h2 className="h3" style={{ marginBottom: 8 }}>Lista selecionada</h2>
            {!selected && <p>Carregando lista...</p>}
            {selected && (
              <>
                <div style={{ marginBottom: 8 }}>
                  <strong>{selected.name}</strong>
                  {selected.description && (
                    <span style={{ opacity: 0.8 }}> — {selected.description}</span>
                  )}
                </div>

                <form onSubmit={handleAddRecipe} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <input
                    type="number"
                    min={1}
                    value={addRecipeId}
                    onChange={(e) => setAddRecipeId(e.target.value)}
                    placeholder="ID da receita"
                    style={{ padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8 }}
                  />
                  <button type="submit" disabled={busy} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}>
                    Adicionar receita
                  </button>
                </form>

                <ul className="list" style={{ maxWidth: 720 }}>
                  {(selected.items ?? []).map((it) => (
                    <li key={it.recipeId} className="list-item -no-gutters" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 28, opacity: 0.6 }}>#{it.recipeId}</span>
                      <span style={{ flex: 1 }}>{it.recipe?.name ?? 'Receita'}</span>
                      <button onClick={() => handleRemoveRecipe(it.recipeId)} style={{ padding: 8, borderRadius: 6, border: '1px solid #eee' }}>
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}
      </div>
    );
  }, [loading, error, lists, selectedId, selected, newName, newDesc, addRecipeId, busy]);

  return body;
}

