import React, { createContext } from 'react';

export interface NavigationContextType {
  stack: Array<string>;
  setStack?: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const NavigationContext = createContext<NavigationContextType>({
  stack: ['main'],
});

export default NavigationContext;
