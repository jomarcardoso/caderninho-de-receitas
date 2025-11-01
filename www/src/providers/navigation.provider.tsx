'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface NavContext {
  stack: string[];
  push: (path: string) => void;
  pop: () => void;
  reset: (path?: string) => void;
}

/**
 * Chave usada no localStorage
 */
const STORAGE_KEY = 'app_nav_stack';

const NavigationContext = createContext<NavContext | null>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const stackRef = useRef<string[]>([]);
  const [, forceRender] = useState(0); // usado para re-renderizar após atualização

  // 🚀 1. Carrega o stack do localStorage no início
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          stackRef.current = parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to load navigation stack from localStorage:', err);
    }
  }, []);

  // 🧭 2. Função auxiliar para salvar stack
  const saveStack = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stackRef.current));
    } catch (err) {
      console.warn('Failed to save navigation stack:', err);
    }
  }, []);

  // 🧱 3. push
  const push = useCallback(
    (path: string) => {
      stackRef.current.push(path);
      saveStack();
      forceRender((n) => n + 1);
      router.push(path);
    },
    [router, saveStack],
  );

  // 🔙 4. pop
  const pop = useCallback(() => {
    if (stackRef.current.length > 1) {
      stackRef.current.pop();
      saveStack();
      forceRender((n) => n + 1);
      const previous = stackRef.current[stackRef.current.length - 1];
      router.push(previous);
    } else {
      router.push('/');
    }
  }, [router, saveStack]);

  // 🔄 5. reset
  const reset = useCallback(
    (path: string = '/') => {
      stackRef.current = [path];
      saveStack();
      forceRender((n) => n + 1);
      router.push(path);
    },
    [router, saveStack],
  );

  return (
    <NavigationContext.Provider
      value={{ stack: stackRef.current, push, pop, reset }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useAppNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error('useAppNavigation must be used inside NavigationProvider');
  return ctx;
};
