import { createContext } from 'react';

export type Theme = 'base' | 'light' | 'primary';

export const ThemeContext = createContext<Theme>('base');