import React, { FC } from 'react';
import Badge from '@material-ui/core/Badge';
import CardContent from '@material-ui/core/CardContent';
import { CardProps } from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Image from './image/image';
import Card from './card/card';
import { Portion, PORTION } from '../services/portion/portion.types';

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

interface Props extends CardProps {
  portion: Portion;
  hideBadge?: boolean;
  padding?: number;
}

const ResumedPortion: FC<Props> = ({
  portion = PORTION,
  hideBadge = true,
  padding = 0,
  ...props
}) => {
  const classes = useStyles(padding)();

  return (
    <Card className={classes.card} {...props}>
      <CardContent className={classes.card}>
        <Badge
          max={9999}
          className={classes.badge}
          badgeContent={!hideBadge ? `${portion.quantity}g` : null}
          color="secondary"
          component="div"
        >
          <Image
            disableSpinner={!portion.food.icon}
            src={portion.food.icon}
            alt={portion.food.name}
          />
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ResumedPortion;
