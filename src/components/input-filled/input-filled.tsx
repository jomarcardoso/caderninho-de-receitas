import React, { FC } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { gray, light, primary } from '../page/page';

const useStyles = makeStyles({
  input: {
    backgroundColor: light,

    '&:hover, &.Mui-focused': {
      backgroundColor: gray.lighter,
    },
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
      variant="filled"
      InputProps={{
        classes: {
          root: classes.input,
        },
      }}
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
