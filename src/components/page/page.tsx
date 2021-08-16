import React, { FC, useEffect, useState } from 'react';
// @ts-expect-error instalação esquisita
// eslint-disable-next-line import/no-extraneous-dependencies
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { createTheme } from '@material-ui/core/styles';
import StyleContext, { Style } from '../../contexts/style';

export const primary = {
  light: '#a18278',
  main: '#87695e',
  dark: '#695149',
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
  borderColor: dark,
  borderWidth: 1,
};

function theme({ bgBody = '' }: Style) {
  return createTheme({
    palette: {
      primary,
      secondary: {
        main: dark,
      },
      // action,
      divider: gray.dark,
      // grey: {
      //   '800': '#f4f4f4',
      //   '700': '#f1f1f1',
      //   '600': '#e4e4e4',
      //   '400': '#c9c9c9',
      // },
      background: {
        default: bgBody || light,
        // paper: '#D7D6D6',
        // paper: '#BEB2C8',
      },
      // type: 'dark',
      text: {
        primary: dark,
        secondary: dark,
      },
      // success: {
      //   main: '#4d7a60',
      // },
      // warning: {
      //   main: '#7a794d',
      // },
      // error: {
      //   main: '#7a4d4d',
      // },
    },
    shape: {
      borderRadius: 4,
    },
    typography: {
      h1: {
        fontSize: '24px',
        fontWeight: 600,
        textTransform: 'uppercase',
        color: primary.dark,
        letterSpacing: 1,
      },
      h2: {
        fontSize: '20px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 1,
      },
      h3: {
        letterSpacing: 1,
        color: primary.dark,
        fontSize: '20px',
        fontWeight: 600,
        textTransform: 'capitalize',
      },
      h4: {
        fontSize: '20px',
        fontWeight: 500,
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
