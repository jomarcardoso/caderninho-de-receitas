/* Dev-only helpers to inspect and manage recipes cache from the browser console */
import { getCachedRecipesData } from '../storage/recipes-cache';

declare global {
  interface Window {
    dumpRecipesCache?: () => Promise<void>;
    clearRecipesCache?: () => Promise<void>;
  }
}

export function attachCacheDebug() {
  if (typeof window === 'undefined') return;

  window.dumpRecipesCache = async () => {
    try {
      const data = await getCachedRecipesData();
      // Basic summary
      const summary = {
        recipes: data?.recipes?.length ?? 0,
        foods: data?.foods?.length ?? 0,
        measures: data?.measures?.length ?? 0,
        foodTypes: data?.foodTypes?.length ?? 0,
        measurementUnits: data?.measurementUnits?.length ?? 0,
        vitamins: data?.vitamins?.length ?? 0,
        minerals: data?.minerals?.length ?? 0,
        aminoAcids: data?.aminoAcids?.length ?? 0,
        hasFoodIcons: Boolean((data as any)?.foodIcons && Object.keys((data as any)?.foodIcons).length),
      };
      console.group('[IndexedDB] recipesData summary');
      console.table(summary as any);
      console.groupEnd();
      console.log('[IndexedDB] recipesData full object:', data);
    } catch (e) {
      console.error('[IndexedDB] dump error', e);
    }
  };

  window.clearRecipesCache = async () => {
    try {
      const DB_NAME = 'caderninho-db';
      const STORE = 'cache';
      const KEY = 'recipesData';
      const req = indexedDB.open(DB_NAME);
      await new Promise<IDBDatabase>((resolve, reject) => {
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }).then((db) => {
        return new Promise<void>((resolve, reject) => {
          const tx = db.transaction(STORE, 'readwrite');
          const store = tx.objectStore(STORE);
          const del = store.delete(KEY);
          del.onsuccess = () => resolve();
          del.onerror = () => reject(del.error);
        });
      });
      console.info('[IndexedDB] recipesData cleared');
    } catch (e) {
      console.error('[IndexedDB] clear error', e);
    }
  };

  // No banner/logs at attach time
}
