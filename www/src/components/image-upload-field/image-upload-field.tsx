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
  onSearchImages?: (term: string) => Promise<SearchImageResult[]>;
}

export interface SearchImageResult {
  foodId: number;
  name?: string;
  imgs: string[];
}

export function ImageUploadField({
  prefix,
  imgs,
  onChange,
  label = 'Imagens',
  allowMultiple = true,
  uploadOptions,
  onSearchImages,
}: ImageUploadFieldProps) {
  const [imageLink, setImageLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchImageResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

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

  const handleSearch = async () => {
    const term = (searchTerm || '').trim();
    if (!term || !onSearchImages) return;
    setSearchError(null);
    setSearching(true);
    try {
      const results = await onSearchImages(term);
      setSearchResults(Array.isArray(results) ? results : []);
    } catch (err: any) {
      setSearchError(err?.message || 'Falha na busca de imagens');
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
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

      {onSearchImages && (
        <div style={{ display: 'grid', gap: 6 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Field
              placeholder="buscar imagens por alimento"
              name={'imageSearchDraft' as any}
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e?.target?.value ?? '')}
              breakline={false}
              type="text"
            />
            <Button
              type="button"
              variant="secondary"
              disabled={searching}
              onClick={handleSearch}
            >
              {searching ? 'Buscando...' : 'Buscar imagens'}
            </Button>
          </div>
          {searchError && (
            <div style={{ color: 'var(--color-danger)' }}>{searchError}</div>
          )}
          {searchResults.length > 0 && (
            <div style={{ display: 'grid', gap: 8 }}>
              {searchResults.map((res) => (
                <div key={res.foodId} style={{ border: '1px solid #eee', padding: 8, borderRadius: 8 }}>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    {res.name || `Alimento ${res.foodId}`}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {res.imgs.map((url, idx) => (
                      <button
                        key={url + idx}
                        type="button"
                        onClick={() => appendImage(url)}
                        style={{
                          border: '1px solid #ddd',
                          borderRadius: 6,
                          padding: 0,
                          cursor: 'pointer',
                          background: '#fff',
                          width: 96,
                        }}
                        title="Usar esta imagem"
                      >
                        <Image2 src={url} alt="" aspectRatio={1} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
