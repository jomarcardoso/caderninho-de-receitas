import React, { FC } from 'react';
import Select, { SelectProps } from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
