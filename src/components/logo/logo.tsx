import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';
import { primary } from '../page/page';

const useStyles = ({ active = false }) =>
  makeStyles({
    root: {
      textAlign: 'justify',
      lineHeight: 0.82,
      fontSize: 16,
      textShadow: active ? '0 0 1px currentColor' : '',
      whiteSpace: 'nowrap',
      letterSpacing: 0,
    },
    textSmall: {
      color: active ? primary.main : 'inherit',
    },
    textLarge: {
      fontSize: 17,
      letterSpacing: 0.1,
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
