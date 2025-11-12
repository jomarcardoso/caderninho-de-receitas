// app/components/NavLink.tsx
'use client';

import { useAppNavigation } from '@/hooks/useAppNavigation';
import { HTMLProps, MouseEvent } from 'react';

interface NavLinkProps extends HTMLProps<HTMLAnchorElement> {
  /** Ação do hook: push, pop ou reset */
  action: 'push' | 'pop' | 'reset';
  /** Caminho alvo, usado apenas em push e reset */
  to?: string;
  /** Conteúdo do link */
  children: React.ReactNode;
  /** Callback opcional após a navegação */
  onNavigate?: () => void;
  /** Desabilitar preventDefault (para comportar-se como link normal) */
  native?: boolean;
}

/**
 * <NavLink> — âncora sem estilo que usa o hook de navegação customizada.
 */
export function NavLink({
  action,
  to,
  children,
  onNavigate,
  native = false,
  ...props
}: NavLinkProps) {
  const { push, pop, reset } = useAppNavigation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (native) return;
    e.preventDefault();

    switch (action) {
      case 'push':
        if (to) push(to);
        break;
      case 'reset':
        reset(to);
        break;
      case 'pop':
        try {
          if (
            typeof window !== 'undefined' &&
            window.history &&
            window.history.length > 0
          ) {
            window.history.back();
            return;
          }
        } catch {}
        // Fallback to internal stack pop if History API not available
        pop();
        break;
      default:
        console.warn(`NavLink: ação desconhecida "${action}"`);
    }

    onNavigate?.();
  };

  return (
    <a href={to || '#'} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
