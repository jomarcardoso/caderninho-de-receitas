'use client';
import { type FC, useState } from 'react';
import type { CategoryItem } from '@/services/categories.service';
import { Button } from 'notebook-layout';
import { CategoryEditDialog } from '@/components/category-edit-dialog/category-edit-dialog';
import { hasKeeperPermission } from '@/services/auth/auth.service';

interface Props {
  category: CategoryItem;
  canEdit?: boolean;
}

export const CategoryBanner: FC<Props> = ({ category, canEdit = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        className="mb-4"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 12,
          minHeight: 180,
          background: '#f5f5f5',
        }}
      >
        {category.bannerImg ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${category.bannerImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.8)',
            }}
          />
        ) : null}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            color: '#fff',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <span style={{ opacity: 0.8, fontSize: 12 }}>Categoria</span>
          <h1 style={{ margin: 0, fontSize: 28 }}>{category.text?.pt || category.key}</h1>
          {category.description?.pt && (
            <p style={{ margin: 0, maxWidth: 820 }}>{category.description.pt}</p>
          )}
          {canEdit && (
            <div>
              <Button
                type="button"
                variant="secondary"
          onClick={async () => {
            const allowed = await hasKeeperPermission();
            if (allowed) setOpen(true);
            else alert('Apenas mantenedores podem editar categorias.');
          }}
        >
          Editar categoria
        </Button>
            </div>
          )}
        </div>
      </section>

      {open && (
        <CategoryEditDialog
          category={category}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
