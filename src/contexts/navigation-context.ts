import React, { createContext } from 'react';

const NavigationContext = createContext<{
  stack: Array<string>;
  setStack?: React.Dispatch<React.SetStateAction<Array<string>>>;
}>({ stack: ['main-panel'] });

export default NavigationContext;
