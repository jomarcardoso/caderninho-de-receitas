import type { RecipesData } from 'services/recipe/recipe.model';

const DB_NAME = 'caderninho-db';
const DB_VERSION = 1;
const STORE = 'cache';
const KEY_RECIPES = 'recipesData';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet<T = unknown>(key: string): Promise<T | null> {
  try {
    const db = await openDb();
    return await new Promise<T | null>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const store = tx.objectStore(STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as T) ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function idbPut<T = unknown>(key: string, value: T): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      const req = store.put(value as any, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // ignore cache write errors
  }
}

export async function getCachedRecipesData(): Promise<RecipesData | null> {
  const raw = await idbGet<RecipesData>(KEY_RECIPES);
  if (!raw) return null;
  // Normalizações defensivas para dados antigos/variantes
  const anyRaw: any = raw as any;
  if (!Array.isArray((anyRaw as any).foods) && Array.isArray((anyRaw as any).Foods)) {
    anyRaw.foods = anyRaw.Foods;
  }
  if (!Array.isArray((anyRaw as any).recipes) && Array.isArray((anyRaw as any).Recipes)) {
    anyRaw.recipes = anyRaw.Recipes;
  }
  return anyRaw as RecipesData;
}

export async function setCachedRecipesData(data: RecipesData): Promise<void> {
  await idbPut(KEY_RECIPES, data);
}
