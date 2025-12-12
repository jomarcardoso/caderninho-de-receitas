'use client';
import type { ReactNode } from 'react';
import Dialog from 'notebook-layout/components/dialog/dialog';
import { Button } from 'notebook-layout';

export type ShareDialogProps = {
  open: boolean;
  busy?: boolean;
  shareLink?: string;
  slug?: string;
  imagePreview?: ReactNode;
  imageLoading?: boolean;
  imageUrl?: string;
  onCopyImage?: () => void | Promise<void>;
  onDownloadImage?: () => void | Promise<void>;
  onShareImage?: () => void | Promise<void>;
  onClose: () => void;
  onCopyLink: () => void | Promise<void>;
  onShareText: () => void | Promise<void>;
  onSelectImage: () => void | Promise<void>;
};

export function ShareDialog({
  open,
  busy,
  shareLink,
  slug,
  imagePreview,
  imageLoading,
  imageUrl,
  onCopyImage,
  onDownloadImage,
  onShareImage,
  onClose,
  onCopyLink,
  onShareText,
  onSelectImage,
}: ShareDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      header="Compartilhar receita"
      footer={
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={busy}
        >
          fechar
        </Button>
      }
    >
      <div className="grid columns-1 g-3">
        <p>Escolha como deseja compartilhar esta receita.</p>

        {slug && (
          <p style={{ wordBreak: 'break-word' }}>
            Link:
            <br />
            <small>{shareLink}</small>
          </p>
        )}

        <div style={{ display: 'grid', gap: 12 }}>
          <button
            type="button"
            className="btn -ghost"
            onClick={onCopyLink}
            disabled={busy}
          >
            Copiar link
          </button>

          <button
            type="button"
            className="btn -ghost"
            onClick={onShareText}
            disabled={busy}
          >
            Texto + link
          </button>

          <div
            style={{
              border: '1px solid var(--border-color, #e0e0e0)',
              borderRadius: 8,
              padding: 12,
              display: 'grid',
              gap: 8,
            }}
          >
            <button
              type="button"
              className="btn -ghost"
              onClick={onSelectImage}
              disabled={busy || imageLoading}
            >
              {imageLoading ? 'Gerando prévia...' : 'Imagem para stories/posts'}
            </button>
            {imagePreview && (
              <div
                className="theme-light"
                style={{
                  border: '1px dashed var(--border-color, #d0d0d0)',
                  borderRadius: 8,
                  // padding: 8,
                  // background: 'var(--surface-2, #f7f7f7)',
                  display: 'grid',
                  gap: 8,
                }}
              >
                {imagePreview}
                {imageUrl ? (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn -primary"
                      onClick={onDownloadImage}
                    >
                      Baixar imagem
                    </button>
                    <button type="button" className="btn" onClick={onCopyImage}>
                      Copiar imagem
                    </button>
                    {onShareImage ? (
                      <button
                        type="button"
                        className="btn"
                        onClick={onShareImage}
                      >
                        Compartilhar imagem
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
