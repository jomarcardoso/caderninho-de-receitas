import React, { FC } from 'react';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { fontFamilyInput } from '../page/page';
import Container from '../container/container';

const useStyles = makeStyles({
  wrapper: {
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#87695ecf',
  },
  base: {
    border: '2px solid #87695ecf',
    flex: 1,
    backgroundImage: 'url(/images/textures/paper-texture.png)',
    filter: 'contrast(1.1)',
  },
  header: {
    color: 'white',
    padding: '8px 0',
    margin: 0,
    fontSize: 17,
    display: 'block',
  },
  root: {
    transition: 'border-color 200ms linear',
    background: 'transparent',
    display: 'block',
    padding: 8,

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
    lineHeight: '31.2px',
    fontFamily: fontFamilyInput,
    fontSize: 22,
  },
});

const useInputStyles = makeStyles({
  root: {
    display: 'block',
    padding: 0,
  },
});

const InputFilled: FC<StandardTextFieldProps> = ({ label = '', ...props }) => {
  const classes = useStyles();
  const inputClasses = useInputStyles();

  return (
    <div className={classes.wrapper}>
      {label && (
        <Typography
          variant="h2"
          component="label"
          align="left"
          className={classes.header}
        >
          <Container>{label}</Container>
        </Typography>
      )}
      <div className={classes.base}>
        <TextField
          multiline
          minRows={1}
          variant="filled"
          classes={inputClasses}
          InputProps={{
            classes: {
              root: classes.root,
              input: classes.input,
              underline: classes.underline,
            },
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputFilled;
