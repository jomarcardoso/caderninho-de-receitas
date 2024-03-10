import React, { FC, HTMLProps, useEffect, useMemo, useState } from 'react';
import LoadingContext from '../../contexts/loading';
import NavigationContext from '../../contexts/navigation-context';
import { isMobile } from '../../services/user-agent/user-agent.service';

export type PageProps = HTMLProps<HTMLDivElement>;

const Page: FC<PageProps> = ({ children, ...props }) => {
  const [navigationStack, setNavigationStack] = useState<string[]>(['main']);
  const [, setReRender] = useState(false);
  const [loading, setLoading] = useState(false);

  const memoizedNavigation = useMemo(
    () => ({ stack: navigationStack, setStack: setNavigationStack }),
    [navigationStack],
  );
  const memoizedLoading = useMemo(() => ({ loading, setLoading }), [loading]);

  // fix wrong render with JS
  useEffect(() => {
    setReRender(true);
  }, []);

  useEffect(() => {
    // window.location.hash = 'main';
    if (isMobile()) {
      window.history.pushState({}, '', '#main');
    }
  }, []);

  return (
    <div {...props}>
      <NavigationContext.Provider value={memoizedNavigation}>
        <LoadingContext.Provider value={memoizedLoading}>
          {children}
        </LoadingContext.Provider>
      </NavigationContext.Provider>
    </div>
  );
};

export default Page;
