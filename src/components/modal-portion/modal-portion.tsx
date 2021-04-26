import Modal, { ModalProps } from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Portion } from '../../services/portion/portion.types';

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
          <div>{portion.quantity}</div>
          <div>{portion.measure.type}</div>
          <div>{portion.measure.quantity}</div>
          <div>{portion.food.name}</div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ModalPortion;
