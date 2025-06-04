import React, { FC, HTMLProps, useEffect, useMemo, useState } from 'react';
import NavigationContext from './navigation.context';

export const NavigationProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const [navigationStack, setNavigationStack] = useState<string[]>(['main']);
  const memoizedNavigation = useMemo(
    () => ({ stack: navigationStack, setStack: setNavigationStack }),
    [navigationStack],
  );
  const [, setReRender] = useState(false);

  // fix wrong render with JS
  useEffect(() => {
    setReRender(true);
  }, []);

  useEffect(() => {
    window.history.pushState({}, '', '#main');
  }, []);

  return (
    <NavigationContext.Provider value={memoizedNavigation}>
      {children}
    </NavigationContext.Provider>
  );
};
