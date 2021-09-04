import React, { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import FoodPanel from '../../panels/food';
import { FOOD, Food } from '../../services/food';
import { HeaderProps } from '../header';

export interface DialogFoodProps {
  open: boolean;
  food: Food;
  onClose: HeaderProps['onClose'];
}

const DialogTransition: FC<SlideProps> = (props) => {
  return <Slide direction="right" {...props} />;
};

const DialogFood: FC<DialogFoodProps> = ({
  open = false,
  food = FOOD,
  onClose,
}) => {
  return (
    <Dialog fullScreen open={open} TransitionComponent={DialogTransition}>
      <FoodPanel food={food} headerProps={{ onClose }} />
    </Dialog>
  );
};

export default DialogFood;
