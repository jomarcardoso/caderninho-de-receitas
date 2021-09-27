import Grid from '@material-ui/core/Grid';
import React, { FC, HTMLProps } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DiceOneSolidSvg from '../../assets/svg/dice-one-solid.svg';
import DiceTwoSolidSvg from '../../assets/svg/dice-two-solid.svg';
import DiceThreeSolidSvg from '../../assets/svg/dice-three-solid.svg';
import DiceFourSolidSvg from '../../assets/svg/dice-four-solid.svg';

const useStyles = makeStyles({
  root: {
    color: '#00000066',
  },
  input: {
    display: 'none',

    '&:checked ~ $icon': {
      color: '#000000bb',
    },
  },
  icon: {},
  label: {
    display: 'block',
  },
});

const StepsInput: FC<{
  inputProps: HTMLProps<HTMLInputElement>;
}> = ({ inputProps: { value, ...inputProps } }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={3}>
        <label className={classes.label} htmlFor="total-steps-1">
          <input
            id="total-steps-1"
            checked={Number(value) === 1}
            value="1"
            type="radio"
            className={classes.input}
            {...inputProps}
          />
          <DiceOneSolidSvg className={classes.icon} />
        </label>
      </Grid>
      <Grid item xs={3}>
        <label className={classes.label} htmlFor="total-steps-2">
          <input
            id="total-steps-2"
            checked={Number(value) === 2}
            value="2"
            type="radio"
            className={classes.input}
            {...inputProps}
          />
          <DiceTwoSolidSvg className={classes.icon} />
        </label>
      </Grid>
      <Grid item xs={3}>
        <label className={classes.label} htmlFor="total-steps-3">
          <input
            id="total-steps-3"
            checked={Number(value) === 3}
            value="3"
            type="radio"
            className={classes.input}
            {...inputProps}
          />
          <DiceThreeSolidSvg className={classes.icon} />
        </label>
      </Grid>
      <Grid item xs={3}>
        <label className={classes.label} htmlFor="total-steps-4">
          <input
            id="total-steps-4"
            checked={Number(value) === 4}
            value="4"
            type="radio"
            className={classes.input}
            {...inputProps}
          />
          <DiceFourSolidSvg className={classes.icon} />
        </label>
      </Grid>
    </Grid>
  );
};

export default StepsInput;
