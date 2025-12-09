import { useState } from 'react';
import { Field, Button } from 'notebook-layout';
import UploadButton from '../upload-button/upload-button';
import { Image2 } from '../image-2/image';
import {
  uploadImageFromUrl,
  type UploadRecipeImageOptions,
} from '../../services/upload/recipe-image.service';

interface ImageUploadFieldProps {
  prefix: string;
  imgs: string[];
  onChange: (imgs: string[]) => void;
  label?: string;
  allowMultiple?: boolean;
  uploadOptions?: Omit<UploadRecipeImageOptions, 'prefix'>;
}

export function ImageUploadField({
  prefix,
  imgs,
  onChange,
  label = 'Imagens',
  allowMultiple = true,
  uploadOptions,
}: ImageUploadFieldProps) {
  const [imageLink, setImageLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const appendImage = (url: string) => {
    const next = allowMultiple ? [...(imgs || []), url] : [url];
    onChange(next);
  };

  const handleLinkUpload = async () => {
    const link = (imageLink || '').trim();
    if (!link) return;
    setError(null);
    setUploading(true);
    try {
      const { url } = await uploadImageFromUrl(link, {
        prefix,
        ...uploadOptions,
      });
      appendImage(url);
      setImageLink('');
    } catch (err: any) {
      setError(err?.message || 'Falha ao enviar imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleFileUploaded = (url: string) => {
    appendImage(url);
  };

  const handleRemove = (idx: number) => {
    const next = (imgs || []).filter((_, i) => i !== idx);
    onChange(next);
  };

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <h3 className="h3">{label}</h3>
      <div className="d-flex gap-3 align-items-center" style={{ flexWrap: 'wrap' }}>
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Field
            placeholder="colar link da imagem"
            name={'imageLinkDraft' as any}
            value={imageLink}
            onChange={(e: any) => setImageLink(e?.target?.value ?? '')}
            breakline={false}
            type="text"
          />
          <Button
            type="button"
            variant="secondary"
            disabled={uploading}
            onClick={handleLinkUpload}
          >
            {uploading ? 'Enviando...' : 'Enviar link'}
          </Button>
          <UploadButton
            label="Enviar arquivo"
            prefix={prefix}
            uploadOptions={uploadOptions}
            onUploaded={handleFileUploaded}
          />
        </div>
        {error && (
          <div style={{ color: 'var(--color-danger)', marginTop: 6 }}>
            {error}
          </div>
        )}
      </div>

      {!!imgs?.length && (
        <div
          className="d-flex gap-3 align-items-center"
          style={{ flexWrap: 'wrap', marginTop: 8 }}
        >
          {imgs.map((url, i) => (
            <div
              key={url + i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                alignItems: 'center',
              }}
            >
              <div style={{ width: 120, borderRadius: 8, overflow: 'hidden' }}>
                <Image2 src={url} alt="" aspectRatio={1.25} />
              </div>
              <Button
                variant="secondary"
                contrast="light"
                type="button"
                onClick={() => handleRemove(i)}
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploadField;
