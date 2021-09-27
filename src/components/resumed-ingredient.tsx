import React, { FC } from 'react';
import Badge from '@material-ui/core/Badge';
import CardContent from '@material-ui/core/CardContent';
import { CardProps } from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Image from './image/image';
import Card from './card/card';
import { Ingredient, PORTION } from '../services/ingredient/ingredient.types';

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
  ingredient: Ingredient;
  hideBadge?: boolean;
  padding?: number;
}

const ResumedIngredient: FC<Props> = ({
  ingredient = PORTION,
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
          badgeContent={!hideBadge ? `${ingredient.quantity}g` : null}
          color="secondary"
          component="div"
        >
          <Image src={ingredient.food.icon} alt={ingredient.food.name} />
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ResumedIngredient;
