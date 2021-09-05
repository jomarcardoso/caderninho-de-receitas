import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC } from 'react';
import { primary } from '../page/page';

const useStyles = ({ active = false }) =>
  makeStyles({
    root: {
      lineHeight: 0.8,
      fontSize: 16,
      textShadow: active ? '0 0 1px currentColor' : '',
      whiteSpace: 'nowrap',
    },
    textSmall: {
      color: active ? primary.main : 'inherit',
    },
    textLarge: {
      fontSize: 17,
    },
  });

const Logo: FC<{ active: boolean }> = ({ active = false }) => {
  const classes = useStyles({ active })();

  return (
    <Typography component="h1" variant="h1" className={classes.root}>
      <div className={classes.textSmall}>caderninho</div>
      <div className={classes.textLarge}>DE RECEITAS</div>
    </Typography>
  );
};

export default Logo;
