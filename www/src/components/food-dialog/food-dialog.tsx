'use client';
import { type FC, useEffect, useState } from 'react';
import { Button, Dialog } from 'notebook-layout';
import type { DialogProps } from 'notebook-layout/components/dialog/dialog';
import type { Food } from '@common/services/food/food.model';
import { Language } from '@/contexts/language';
import FoodDetails from '@/components/food-details/food-details';
import FoodRegister from '@/components/food-register/food-register';

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
  open,
  ...dialogProps
}) => {
  const language: Language = 'pt';
  const resolvedTitle = title ?? food?.name?.[language] ?? '';
  const paddingless = typeof noPadding === 'boolean' ? noPadding : true;
  const [canEdit] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!open) {
      setEditing(false);
      return;
    }
    setEditing(false);
  }, [open, food?.id]);

  const editEnabled = canEdit && !!food;
  let mergedActions: DialogProps['actions'] = actions ?? null;
  if (editEnabled) {
    const editButton = (
      <Button
        type="button"
        variant={editing ? 'secondary' : 'primary'}
        onClick={() => setEditing((prev) => !prev)}
      >
        {editing ? 'ver alimento' : 'editar alimento'}
      </Button>
    );

    mergedActions = actions ? (
      <>
        {actions}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {editButton}
        </div>
      </>
    ) : (
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        {editButton}
      </div>
    );
  }

  const content =
    editEnabled && editing && food ? (
      <FoodRegister food={food} />
    ) : (
      <FoodDetails food={food} quantity={quantity} />
    );

  return (
    <Dialog
      {...dialogProps}
      open={open}
      title={resolvedTitle}
      noPadding={paddingless}
      actions={mergedActions}
    >
      {content}
    </Dialog>
  );
};

export default FoodDialog;
