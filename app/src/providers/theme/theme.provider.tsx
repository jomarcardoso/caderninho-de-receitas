import { use, type FC, type HTMLProps } from 'react';
import { ThemeContext, type Theme } from './theme.context';

export interface ThemeProviderProps extends HTMLProps<HTMLDivElement> {
  theme: Theme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ theme = 'base', children }) => {
  const className = useMemo(() => {
    switch (theme) {
      case 'base':
        return 'theme-base';
      case 'light':
        return 'theme-light';
      case 'primary':
        return 'theme-primary';
      default:
        return 'theme-base';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={className}>{children}</div>
    </ThemeContext.Provider>
  )
}