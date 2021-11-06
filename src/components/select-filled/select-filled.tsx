import React, { FC } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';
import { gray, light, primary } from '../page/page';

const useStyles = makeStyles({
  label: {
    zIndex: 1,
    color: primary.main,

    '&:hover, &.Mui-focused': {
      color: primary.dark,
    },
  },
  formControl: {
    // display: 'flex',
  },
});

const useSelectStyles = makeStyles({
  root: {
    backgroundColor: light,

    '&:hover, &.Mui-focused': {
      backgroundColor: gray.lighter,
    },
  },
  select: {
    backgroundColor: 'transparent',

    '&:focus, &:active': {
      backgroundColor: 'transparent',
    },
  },
});

const SelectFilled: FC<SelectProps> = ({ children, ...props }) => {
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  const id = `select-${props.name}`;
  const labelId = `${id}-label`;

  return (
    <FormControl fullWidth variant="filled" className={classes.formControl}>
      <InputLabel className={classes.label} id={labelId}>
        {props.label}
      </InputLabel>

      <Select
        id={id}
        labelId={labelId}
        className={selectClasses.root}
        classes={selectClasses}
        // variant="filled"
        {...props}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectFilled;
