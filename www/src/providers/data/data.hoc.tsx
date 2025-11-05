'use client';

import React, { ComponentType, useEffect } from 'react';
import { useData } from './data.hook';

// P = props originais do componente
export function withData<P>(WrappedComponent: ComponentType<P>) {
  // adiciona uma prop extra: initialData (opcional)
  type PropsWithInitialData = P & { initialData?: unknown };

  const WithDataSync: React.FC<PropsWithInitialData> = (props) => {
    const { setData } = useData();

    useEffect(() => {
      if (props.initialData && typeof setData === 'function') {
        setData(props.initialData);
      }
    }, [props.initialData, setData]);

    // repassa todas as props originais
    return <WrappedComponent {...(props as P)} />;
  };

  WithDataSync.displayName = `WithData(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithDataSync;
}
