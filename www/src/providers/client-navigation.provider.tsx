'use client';

import { NavigationProvider } from './navigation.provider';

export function ClientNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NavigationProvider>{children}</NavigationProvider>;
}
