import React, { FC, HTMLProps, useEffect, useMemo, useState } from 'react';
import StyleContext, { Style } from '../../contexts/style';
import LoadingContext from '../../contexts/loading';
import NavigationContext from '../../contexts/navigation-context';
import { isMobile } from '../../services/user-agent/user-agent.service';

export type PageProps = HTMLProps<HTMLDivElement>;

const Page: FC<PageProps> = ({ children, ...props }) => {
  const [navigationStack, setNavigationStack] = useState<string[]>(['main']);
  const [style, setStyle] = useState<Style>({});
  const [, setReRender] = useState(false);
  const [loading, setLoading] = useState(false);

  const memoizedNavigation = useMemo(
    () => ({ stack: navigationStack, setStack: setNavigationStack }),
    [navigationStack],
  );
  const memoizedStyle = useMemo(() => ({ style, setStyle }), [style]);
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
        <StyleContext.Provider value={memoizedStyle}>
          <LoadingContext.Provider value={memoizedLoading}>
            {children}
          </LoadingContext.Provider>
        </StyleContext.Provider>
      </NavigationContext.Provider>
    </div>
  );
};

export default Page;
