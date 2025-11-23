'use client';
import type { FC } from 'react';
import { Dialog } from 'notebook-layout';
import type { DialogProps } from 'notebook-layout/components/dialog/dialog';
import type { Food } from '@common/services/food/food.model';
import { Language } from '@/contexts/language';
import FoodDetails from '@/components/food-details/food-details';

export interface FoodDialogProps
  extends Omit<DialogProps, 'children' | 'actions'> {
  food?: Food | null;
  quantity?: number;
  actions?: DialogProps['actions'];
}

const FoodDialog: FC<FoodDialogProps> = ({
  food,
  quantity = 100,
  title,
  actions,
  noPadding,
  ...dialogProps
}) => {
  const language: Language = 'pt';
  const resolvedTitle = title ?? food?.name?.[language] ?? '';
  const paddingless = typeof noPadding === 'boolean' ? noPadding : true;

  return (
    <Dialog
      {...dialogProps}
      title={resolvedTitle}
      noPadding={paddingless}
      actions={actions ?? null}
    >
      <FoodDetails food={food} quantity={quantity} />
    </Dialog>
  );
};

export default FoodDialog;
