import React, { FC } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { primary, secondary } from '../page/page';

const useStyles = (linedSheet = false) =>
  makeStyles({
    input: {
      backgroundColor: 'white',

      '&:hover, &.Mui-focused': {
        backgroundColor: 'white',
      },
    },
    inputInput: {
      backgroundImage: linedSheet
        ? `
          linear-gradient(
            to bottom,
            transparent,
            transparent 90%,
            ${secondary.light} 91%,
            ${secondary.light} 92%,
            transparent 93%,
            transparent 100%
          )
        `
        : '',
      backgroundSize: linedSheet ? 'auto 32px' : '',
      minHeight: linedSheet ? 288 : '',
      backgroundRepeat: 'space',
      lineHeight: '32px',
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
  const { multiline = false } = props;

  const classes = useStyles(multiline)();

  return (
    <TextField
      variant="filled"
      InputProps={{
        classes: {
          root: classes.input,
          input: classes.inputInput,
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
