import React from 'react';
import Page from './src/components/page';
import '@fontsource/dosis';
import '@fontsource/cinzel';

export const wrapRootElement = ({ element }) => {
  return <Page>{element}</Page>;
};

export const registerServiceWorker = () => true;
