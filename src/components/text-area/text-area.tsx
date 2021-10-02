import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { fontFamilyInput } from '../page/page';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
    transition: 'border-color 200ms linear',
    padding: 0,

    '&:hover, &.Mui-focused': {
      backgroundColor: 'transparent',
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
    backgroundImage: 'url(/images/textures/linned-sheet-texture.svg)',
    // backgroundSize: 'auto',
    // backgroundRepeat: 'space',
    lineHeight: '31.1px',
    fontFamily: fontFamilyInput,
    fontSize: 22,
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
