import React, { FC, useEffect, useState } from 'react';
// @ts-expect-error instalação esquisita
// eslint-disable-next-line import/no-extraneous-dependencies
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import createTheme from '@material-ui/core/styles/createTheme';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import StyleContext, { Style } from '../../contexts/style';

const fontFamilyDisplay = 'Cinzel, Roboto, Helvetica, Arial, sans-serif';
const fontFamilyText = 'Dosis, Roboto, Helvetica, Arial, sans-serif';

export const primary: PaletteColor = {
  light: '#947368',
  main: '#87695e',
  dark: '#6E564D',
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
  lighter: '#e8e8e8',
};

export const borderPrimary = {
  borderColor: primary.light,
  borderWidth: 2,
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
      borderRadius: 4,
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
        fontFamily: fontFamilyDisplay,
        letterSpacing: 1,
      },
      h1: {
        fontFamily: fontFamilyDisplay,
        fontSize: '23px',
        fontWeight: 400,
        color: secondary.main,
        letterSpacing: 1,
      },
      h2: {
        fontFamily: fontFamilyDisplay,
        color: primary.dark,
        fontSize: '21px',
        fontWeight: 400,
        letterSpacing: 1,
      },
      h3: {
        color: secondary.main,
        fontSize: '18px',
        fontWeight: 600,
        letterSpacing: 1,
      },
      h4: {
        color: primary.dark,
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: 1,
      },
    },
  });
}

const Page: FC = ({ children }) => {
  const [style, setStyle] = useState<Style>({});
  const [, setReRender] = useState(false);

  // fix wrong render with JS
  useEffect(() => {
    setReRender(true);
  }, []);

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      <ThemeTopLayout theme={theme(style)}>{children}</ThemeTopLayout>
    </StyleContext.Provider>
  );
};

export default Page;
