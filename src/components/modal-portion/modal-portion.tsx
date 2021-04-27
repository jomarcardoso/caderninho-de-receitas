import Modal, { ModalProps } from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Portion } from '../../services/portion/portion.types';
import FoodDetailed from '../food-detailed/food-detailed';

interface Props {
  portion: Portion;
}

export type ModalPortionProps = Omit<ModalProps, 'children'> & Props;

const useStyles = makeStyles({
  root: {
    margin: '15px',
    maxHeight: 'calc(100vh - 30px)',
    overflowY: 'auto',
  },
});

const ModalPortion: FC<ModalPortionProps> = ({ portion, ...props }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="Modal de porção"
      aria-describedby="dados nutricionais referentes àquela porção"
      {...props}
    >
      <Card className={classes.root}>
        <CardContent>
          <Grid item xs={12}>
            <Typography component="h1" variant="h1">
              {portion.food.name} ({portion.quantity}g)
            </Typography>
          </Grid>
          <FoodDetailed food={portion.food} quantity={portion.quantity} />
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ModalPortion;
