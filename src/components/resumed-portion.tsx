import React, { FC } from 'react';
import Badge from '@material-ui/core/Badge';
import Grid, { GridProps } from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from './card/card';
import { Portion, PORTION } from '../services/portion/portion.types';
import Image from './image';

const useStyles = (padding = 0) =>
  makeStyles({
    box: {
      display: 'flex',
    },
    card: {
      display: 'flex',
      alignItems: 'flex-end',
      flex: 1,
      justifyContent: 'center',
      padding,
      '&:last-child': {
        paddingBottom: padding,
      },
    },
    badge: {
      flex: 1,
    },
  });

interface Props extends GridProps {
  portion: Portion;
  hideBadge?: boolean;
  padding?: number;
}

const ResumedPortion: FC<Props> = ({
  portion = PORTION,
  hideBadge = false,
  padding = 0,
  ...props
}) => {
  const classes = useStyles(padding)();

  return (
    <Grid item {...props} className={classes.box}>
      <Card className={classes.card}>
        <CardContent className={classes.card}>
          <Badge
            max={9999}
            className={classes.badge}
            badgeContent={!hideBadge ? `${portion.quantity}g` : null}
            color="secondary"
            component="div"
          >
            <Image src={portion.food.image} alt={portion.food.name} />
          </Badge>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ResumedPortion;
