import React, { ChangeEvent, FocusEvent, FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputFilled from '../input-filled/input-filled';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
    position: 'relative',
  },
  floating: {
    position: 'absolute',
    right: '0',
    top: '0',
  },
});

const InputIngredient: FC<{
  index: number;
  value: string;
  remove(index: number): void;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}> = ({ index = 0, value = '', remove, onChange, onBlur }) => {
  const classes = useStyles();

  return (
    <FormControl variant="standard" className={classes.formControl}>
      <InputFilled
        type="text"
        label={`Ingrediente ${index + 1}`}
        name={`portions.${index}`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      <IconButton
        className={classes.floating}
        aria-label={`remover alimento ${index + 1}`}
        onClick={() => remove(index)}
        size="small"
      >
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              fill="currentColor"
              d="M194 256l103-103 21-21c3-3 3-8 0-11l-23-23c-3-3-8-3-11 0L160 222 36 98c-3-3-8-3-11 0L2 121c-3 3-3 8 0 11l124 124L2 380c-3 3-3 8 0 11l23 23c3 3 8 3 11 0l124-124 103 103 21 21c3 3 8 3 11 0l23-23c3-3 3-8 0-11L194 256z"
            />
          </svg>
        </SvgIcon>
      </IconButton>
    </FormControl>
  );
};

export default InputIngredient;
