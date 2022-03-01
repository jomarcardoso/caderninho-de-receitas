import React, { FC, useCallback, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide, { SlideProps } from '@mui/material/Slide';
import FoodPanel from '../../panels/food/food';
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

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    goBack();
  }, [goBack, onClose]);

  useEffect(() => {
    if (open && window.location.hash !== '#food-modal') {
      goTo('#food-modal');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      if (onClose) onClose();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
