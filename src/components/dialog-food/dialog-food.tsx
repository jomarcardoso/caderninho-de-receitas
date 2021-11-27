import React, { FC, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide, { SlideProps } from '@mui/material/Slide';
import FoodPanel from '../../panels/food';
import { FOOD, Food } from '../../services/food';
import { HeaderProps } from '../header/header';
import useNavigation from '../../hooks/use-navigation';

export interface DialogFoodProps {
  open: boolean;
  quantity?: number;
  food: Food;
  onClose: HeaderProps['onClose'];
}

const DialogTransition: FC<SlideProps> = (props) => {
  return <Slide direction="right" {...props} />;
};

const DialogFood: FC<DialogFoodProps> = ({
  open = false,
  food = FOOD,
  quantity = 0,
  onClose,
}) => {
  const { goTo, goBack } = useNavigation();

  function handleClose() {
    if (onClose) onClose();
    goBack();
  }

  useEffect(() => {
    if (open) {
      goTo('#food-modal');
    }
  }, [open, goTo]);

  return (
    <Dialog fullScreen open={open} TransitionComponent={DialogTransition}>
      <FoodPanel
        quantity={quantity}
        food={food}
        headerProps={{ onClose: handleClose }}
      />
    </Dialog>
  );
};

export default DialogFood;
