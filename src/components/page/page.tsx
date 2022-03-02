import React, { FC, useEffect, useMemo, useState } from 'react';
// @ts-expect-error instalação esquisita
// eslint-disable-next-line import/no-extraneous-dependencies
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { createTheme } from '@mui/material';
import { PaletteColor } from '@mui/material/styles/createPalette';
import { makeStyles } from '@mui/styles';
import StyleContext, { Style } from '../../contexts/style';
import LoadingContext from '../../contexts/loading';
import NavigationContext from '../../contexts/navigation-context';

const fontFamilyDisplay = 'Cinzel, Roboto, Helvetica, Arial, sans-serif';
const fontFamilyText = 'Dosis, Roboto, Helvetica, Arial, sans-serif';

export const fontFamilyInput = 'Cedarville Cursive, cursive';

export const primary: PaletteColor = {
  light: '#D4B5A9',
  main: '#87695e',
  dark: '#947368',
  contrastText: '#ffffff',
};

export const secondary: PaletteColor = {
  light: '#4d4d4d',
  main: '#191919',
  dark: '#0a0a0a',
  contrastText: '#ffffff',
};

export const dark = '#191919';

export const light = '#f8f8f8';

export const gray = {
  darker: '#444',
  dark: '#555',
  medium: '#999',
  light: '#d8d8d8',
  lighter: '#f2f2f2',
};

export const borderPrimary = {
  borderColor: primary.light,
  borderWidth: 2,
  borderStyle: 'dashed',
};

export const borderSecondary = {
  borderColor: gray.dark,
  borderWidth: 1,
};

export const borderLight = {
  borderColor: gray.lighter,
  borderWidth: 0.5,
};

function theme({ bgBody = '' }: Style) {
  return createTheme({
    palette: {
      primary,
      secondary,
      divider: gray.dark,
      background: {
        default: bgBody || light,
        paper: '#ffffff',
      },
      text: {
        primary: dark,
        secondary: dark,
      },
    },
    shape: {
      borderRadius: 2,
    },
    typography: {
      fontFamily: fontFamilyText,
      fontSize: 14,
      body1: {
        fontWeight: 200,
      },
      body2: {
        fontWeight: 200,
      },
      button: {
        fontFamily: fontFamilyText,
        letterSpacing: 1,
      },
      h1: {
        fontFamily: fontFamilyDisplay,
        fontSize: '19px',
        fontWeight: 400,
        letterSpacing: 1,
      },
      h2: {
        fontFamily: fontFamilyDisplay,
        fontSize: '19px',
        fontWeight: 400,
        letterSpacing: 1,
      },
      h3: {
        fontSize: '18px',
        fontWeight: 600,
        letterSpacing: 1,
      },
      h4: {
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: 1,
      },
    },
  });
}

const useStyles = ({ addressBarHeight = 0, headerHeight = 0 }) =>
  makeStyles({
    '@global': {
      body: {
        overflow: 'hidden',
      },
      ':root': {
        '--color-primary-light': primary.light,
        '--color-primary-main': primary.main,
        '--color-primary-dark': primary.dark,
        '--color-secondary-light': secondary.light,
        '--color-secondary-main': secondary.main,
        '--color-secondary-dark': secondary.dark,

        '--icon-color-primary': 'var(--color-secondary-main)',
        '--icon-color-secondary': 'var(--color-primary-main)',

        '--address-bar-height': `${addressBarHeight}px`,
        '--header-height': `${headerHeight}px`,
      },
    },
  });

const Page: FC = ({ children }) => {
  const [navigationStack, setNavigationStack] = useState<string[]>([
    'main-panel',
  ]);
  const [style, setStyle] = useState<Style>({});
  const [, setReRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressBarHeight, setAddressBarHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const classes = useStyles({ addressBarHeight, headerHeight })();
  const memoizedNavigation = useMemo(
    () => ({ stack: navigationStack, setStack: setNavigationStack }),
    [navigationStack],
  );
  const memoizedStyle = useMemo(() => ({ style, setStyle }), [style]);
  const memoizedLoading = useMemo(() => ({ loading, setLoading }), [loading]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setAddressBarHeight(
        window.document.documentElement.offsetHeight - window.innerHeight,
      );
    });

    setAddressBarHeight(
      window.document.documentElement.offsetHeight - window.innerHeight,
    );
  }, []);

  // fix wrong render with JS
  useEffect(() => {
    setReRender(true);
  }, []);

  useEffect(() => {
    // window.location.hash = 'main-panel';
    window.history.pushState({}, '', '#main-panel');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const elHeader = document.querySelector('#header') as HTMLElement;

      if (!elHeader) {
        return;
      }

      clearInterval(interval);
      const newHeaderHeight = elHeader.offsetHeight;

      setHeaderHeight(newHeaderHeight);

      elHeader.addEventListener('resize', () => {
        const newHeaderHeight2 = elHeader.offsetHeight;

        setHeaderHeight(newHeaderHeight2);
      });
    }, 100);
  });

  return (
    <div className={classes['@global']}>
      <NavigationContext.Provider value={memoizedNavigation}>
        <StyleContext.Provider value={memoizedStyle}>
          <ThemeTopLayout theme={theme(style)}>
            <LoadingContext.Provider value={memoizedLoading}>
              {children}
            </LoadingContext.Provider>
          </ThemeTopLayout>
        </StyleContext.Provider>
      </NavigationContext.Provider>
    </div>
  );
};

export default Page;
