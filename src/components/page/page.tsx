import React, { FC, useEffect, useState } from 'react';
// @ts-expect-error instalação esquisita
// eslint-disable-next-line import/no-extraneous-dependencies
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { createTheme } from '@mui/material';
import { PaletteColor } from '@mui/material/styles/createPalette';
import { makeStyles } from '@mui/styles';
import StyleContext, { Style } from '../../contexts/style';
import LoadingContext from '../../contexts/loading';

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

const useStyles = makeStyles({
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
    },
  },
});

const Page: FC = ({ children }) => {
  const [style, setStyle] = useState<Style>({});
  const [, setReRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  // fix wrong render with JS
  useEffect(() => {
    setReRender(true);
  }, []);

  return (
    <div className="caderninho">
      <div className={classes['@global']}>
        <StyleContext.Provider value={{ style, setStyle }}>
          <ThemeTopLayout theme={theme(style)}>
            <LoadingContext.Provider value={{ loading, setLoading }}>
              {children}
            </LoadingContext.Provider>
          </ThemeTopLayout>
        </StyleContext.Provider>
      </div>
    </div>
  );
};

export default Page;
