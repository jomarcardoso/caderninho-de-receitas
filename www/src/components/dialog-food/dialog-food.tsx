import React, { FC, useCallback, useEffect } from 'react';
import { Modal } from '@mui/base/Modal';
import FoodPanel from '../../panels/food/food';
import { FOOD, Food } from '../../services/food';
import { HeaderProps } from '../header/header';
import { useNavigation } from '../../providers';

export interface DialogFoodProps {
  open: boolean;
  quantity?: number;
  food: Food;
  onClose: HeaderProps['onClose'];
}

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
  }, [open]);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      if (onClose) onClose();
    });
  }, []);

  return (
    <Modal open={open} className="modal-overlay">
      <FoodPanel
        quantity={quantity}
        food={food}
        headerProps={{ onClose: handleClose }}
        style={{ height: '100vh', background: 'white' }}
      />
    </Modal>
  );
};

export default DialogFood;
