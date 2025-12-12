'use client';
import { useState, useEffect } from 'react';
import { Dialog, Field, Button } from 'notebook-layout';
import type { DialogProps } from 'notebook-layout/components/dialog/dialog';
import type { CategoryItem } from '@/services/categories.service';
import { submitCategoryEdit } from '@/services/category-edits.api';
import { CiCircleChevLeft } from 'react-icons/ci';
import { IoSaveOutline } from 'react-icons/io5';
import ImageUploadField from '@/components/image-upload-field/image-upload-field';
import { searchFoodImages } from '@/services/food-search.api';

export interface CategoryEditDialogProps extends Omit<DialogProps, 'children'> {
  category: CategoryItem;
  onSubmitted?: () => void;
}

export function CategoryEditDialog({
  category,
  onSubmitted,
  ...dialogProps
}: CategoryEditDialogProps) {
  const [namePt, setNamePt] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [descPt, setDescPt] = useState('');
  const [descEn, setDescEn] = useState('');
  const [banner, setBanner] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setNamePt(category?.text?.pt || '');
    setNameEn(category?.text?.en || '');
    setDescPt(category?.description?.pt || '');
    setDescEn(category?.description?.en || '');
    setBanner(category?.bannerImg || '');
  }, [category]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const payload = {
        name: { pt: namePt, en: nameEn },
        description: { pt: descPt, en: descEn },
        bannerImg: banner,
      };
      const categoryId = (category as any)?.id ?? 0;
      if (!categoryId || categoryId <= 0) {
        alert('Categoria sem id. Recarregue a página ou selecione outra.');
        setSubmitting(false);
        return;
      }
      await submitCategoryEdit(categoryId, payload);
      if (onSubmitted) onSubmitted();
      if (dialogProps.onClose) dialogProps.onClose();
      alert('Edição enviada para aprovação.');
    } catch (e: any) {
      alert(e?.message || 'Falha ao enviar edição.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      {...dialogProps}
      header="Editar categoria"
      footer={
        <>
          <Button
            variant="secondary"
            type="button"
            size="small"
            onClick={dialogProps.onClose}
          >
            <CiCircleChevLeft />
            Fechar
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={submitting}>
            <IoSaveOutline />
            {submitting ? 'Enviando...' : 'Enviar para aprovação'}
          </Button>
        </>
      }
    >
      <div style={{ display: 'grid', gap: 12 }}>
        <Field
          label="Nome (PT)"
          value={namePt}
          onChange={(e: any) => setNamePt(e.target.value)}
        />
        <Field
          label="Nome (EN)"
          value={nameEn}
          onChange={(e: any) => setNameEn(e.target.value)}
        />
        <Field
          multiline
          label="Descrição (PT)"
          value={descPt}
          onChange={(e: any) => setDescPt(e.target.value)}
        />
        <Field
          multiline
          label="Descrição (EN)"
          value={descEn}
          onChange={(e: any) => setDescEn(e.target.value)}
        />
        <ImageUploadField
          prefix="categories"
          imgs={banner ? [banner] : []}
          allowMultiple={false}
          label="Banner"
          uploadOptions={{ maxWidth: 1920, maxHeight: 1080, quality: 60 }}
          onChange={(imgs) => setBanner(imgs[0] || '')}
          onSearchImages={searchFoodImages}
        />
      </div>
    </Dialog>
  );
}
