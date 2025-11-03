// app/hooks/useAppNavigation.ts
'use client';

import { NavigationService } from '@/services/navigation.service';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

/**
 * Hook React para manipular a navegação com persistência e sincronização global.
 */
export function useAppNavigation() {
  const router = useRouter();
  const [stack, setStack] = useState<string[]>([]);

  // Inicializa e sincroniza via eventos
  useEffect(() => {
    setStack(NavigationService.getStack());
    const unsubscribe = NavigationService.onChange((newStack) => {
      setStack(newStack);
    });
    return unsubscribe;
  }, []);

  const push = useCallback(
    (path: string) => {
      NavigationService.push(path);
      router.push(path);
    },
    [router],
  );

  const pop = useCallback(() => {
    const previous = NavigationService.pop();
    router.push(previous || '/');
  }, [router]);

  const reset = useCallback(
    (path: string = '/') => {
      NavigationService.reset(path);
      router.push(path);
    },
    [router],
  );

  return { stack, push, pop, reset };
}
