'use client';
import { type FC, type ReactNode, useEffect, useMemo, useState } from 'react';
import { Button, Dialog } from 'notebook-layout';
import type { DialogProps } from 'notebook-layout/components/dialog/dialog';
import type { Food } from '@common/services/food/food.model';
import { Language } from '@/contexts/language';
import FoodDetails from '@/components/food-details/food-details';
import FoodRegister from '@/components/food-register/food-register';
import { submitFoodDeletion } from '@/services/edits.api';
import { CiCircleChevLeft, CiEdit, CiTrash } from 'react-icons/ci';
import { IoSaveOutline } from 'react-icons/io5';

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
  const [deleting, setDeleting] = useState(false);

  const formId = useMemo(
    () => `food-edit-form-${food?.id ?? 'new'}`,
    [food?.id],
  );

  useEffect(() => {
    if (!open) {
      setEditing(false);
      return;
    }
    setEditing(false);
  }, [open, food?.id]);

  const editEnabled = canEdit && !!food;
  const closeDialog = () => {
    if (typeof dialogProps?.onClose === 'function') {
      dialogProps.onClose(new Event('close'));
    }
  };

  const handleDeleteRequest = async () => {
    if (!food?.id) return;
    const confirmed =
      typeof window !== 'undefined'
        ? window.confirm(
            'Deseja solicitar a exclusao deste alimento? Essa acao sera enviada para aprovacao.',
          )
        : false;
    if (!confirmed) return;
    try {
      setDeleting(true);
      const ok = await submitFoodDeletion(food.id);
      alert(
        ok
          ? 'Solicitacao de exclusao enviada para aprovacao.'
          : 'Nao foi possivel enviar a solicitacao de exclusao.',
      );
    } finally {
      setDeleting(false);
    }
  };

  const actionItems: ReactNode[] = [];

  if (actions) actionItems.push(actions);

  if (editEnabled && !editing) {
    actionItems.push(
      <>
        <Button
          key="close"
          type="button"
          variant="secondary"
          onClick={closeDialog}
        >
          <CiCircleChevLeft />
          fechar
        </Button>
        <Button key="edit" type="button" onClick={() => setEditing(true)}>
          <CiEdit />
          editar alimento
        </Button>
      </>,
    );
  }

  if (editEnabled && editing) {
    actionItems.push(
      <Button
        key="view"
        type="button"
        variant="secondary"
        onClick={() => setEditing(false)}
      >
        <CiCircleChevLeft />
        voltar
      </Button>,
    );
    actionItems.push(
      <Button
        key="delete"
        type="button"
        onClick={handleDeleteRequest}
        disabled={deleting}
        style={{
          background: '#b22222',
          borderColor: '#b22222',
        }}
      >
        <CiTrash />
        {deleting ? 'Enviando...' : 'excluir'}
      </Button>,
    );
    actionItems.push(
      <Button key="submit" type="submit" form={formId}>
        <IoSaveOutline />
        salvar
      </Button>,
    );
  }

  const mergedActions: DialogProps['actions'] = <>{actionItems}</>;

  const content =
    editEnabled && editing && food ? (
      <FoodRegister food={food} hideActions formId={formId} />
    ) : (
      <FoodDetails food={food} quantity={quantity} />
    );

  return (
    <Dialog
      {...dialogProps}
      open={open}
      header={resolvedTitle}
      noPadding={paddingless}
      footer={mergedActions}
    >
      {content}
    </Dialog>
  );
};

export default FoodDialog;
