'use client';

import React, { ComponentType, useEffect } from 'react';
import { useData } from './data.hook';
import { type RecipesData } from '@common/services/recipe';

// P = props originais do componente
export function withData<P>(WrappedComponent: ComponentType<P>) {
  // adiciona uma prop extra: initialData (opcional)
  type PropsWithInitialData = P & { data?: RecipesData };

  const WithDataSync: React.FC<PropsWithInitialData> = (props) => {
    const { setData } = useData();

    useEffect(() => {
      if (props.data && typeof setData === 'function') {
        setData(props.data);
      }
    }, [props.data, setData]);

    // repassa todas as props originais
    return <WrappedComponent {...(props as P)} />;
  };

  WithDataSync.displayName = `WithData(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithDataSync;
}
