import React, { FC } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fontFamilyInput, primary } from '../page/page';

const useStyles = makeStyles({
  root: {
    fontFamily: fontFamilyInput,
    borderStyle: 'dashed',

    '& .MuiOutlinedInput-notchedOutline': {
      borderStyle: 'dashed',
    },
  },
  input: {
    backgroundColor: 'transparent',
    border: '2px dashed #00000033',
    padding: '14px 10px 0',

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
  inputInput: {
    lineHeight: '31.2px',
    fontFamily: fontFamilyInput,
    fontSize: 22,
    backgroundRepeat: 'space',
  },
  label: {
    zIndex: 1,
    color: primary.main,

    '&:hover, &.Mui-focused': {
      color: primary.dark,
    },
  },
});

const InputFilled: FC<StandardTextFieldProps> = (props) => {
  const classes = useStyles();

  return (
    <TextField
      multiline
      variant="outlined"
      className={classes.root}
      inputProps={{
        className: classes.inputInput,
      }}
      // InputProps={{
      //   classes: {
      //     root: classes.input,
      //     input: classes.inputInput,
      //     underline: classes.underline,
      //   },
      // }}
      InputLabelProps={{
        classes: {
          root: classes.label,
        },
      }}
      {...props}
    />
  );
};

export default InputFilled;
