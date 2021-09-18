import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { borderPrimary, primary } from '../page/page';

const useStyles = makeStyles({
  root: {
    ...borderPrimary,
    backgroundColor: 'white',
    transition: 'border-color 200ms linear',

    '&:hover, &.Mui-focused': {
      backgroundColor: 'white',
    },

    '&.Mui-focused': {
      borderColor: primary.dark,
    },
  },
  underline: {
    '&:after': {
      display: 'none',
    },
    '&:before': {
      borderBottomColor: 'transparent',
    },

    '&:hover:before': {
      borderBottomColor: 'transparent',
    },
  },
  input: {
    backgroundImage: `
      linear-gradient(
        to right,
        transparent,
        transparent 60%,
        white 61%,
        white 100%
      ),
      linear-gradient(
        to bottom,
        transparent,
        transparent 90%,
        ${primary.light} 91%,
        ${primary.light} 94%,
        transparent 95%,
        transparent 100%
      )
    `,
    backgroundSize: '10px 32px',
    // minHeight: 288,
    backgroundRepeat: 'space',
    lineHeight: '32px',
  },
});

const TextArea: FC<StandardTextFieldProps> = (props) => {
  const classes = useStyles();

  return (
    <TextField
      multiline
      minRows={5}
      variant="filled"
      InputProps={{
        classes: {
          root: classes.root,
          input: classes.input,
          underline: classes.underline,
        },
      }}
      {...props}
    />
  );
};

export default TextArea;
