import { useRef, useState } from 'react';
import { Button } from 'notebook-layout';
import { uploadRecipeImage } from '../../services/upload/recipe-image.service';
import {
  isNativeCameraAvailable,
  takePhotoAsFile,
} from '../../services/upload/camera';
import { CiSaveUp2 } from 'react-icons/ci';

export interface UploadButtonProps {
  onUploaded?: (url: string) => void;
  prefix?: string;
  label?: string;
}

export function UploadButton({
  onUploaded,
  prefix,
  label = 'Enviar imagem',
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const nativeCamera = isNativeCameraAvailable();

  async function handleSelect(ev: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = ev.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const { url: uploadedUrl } = await uploadRecipeImage(file, { prefix });
      setUrl(uploadedUrl);
      onUploaded?.(uploadedUrl);
    } catch (e: any) {
      setError(e?.message || 'Falha ao enviar');
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  async function handleTakePhoto() {
    setError(null);
    setLoading(true);
    try {
      const file = await takePhotoAsFile({ quality: 85, width: 1280 });
      const { url: uploadedUrl } = await uploadRecipeImage(file, { prefix });
      setUrl(uploadedUrl);
      onUploaded?.(uploadedUrl);
    } catch (e: any) {
      setError(e?.message || 'Falha ao capturar/enviar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={nativeCamera ? 'environment' : (undefined as any)}
        onChange={handleSelect}
        style={{ display: 'none' }}
      />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {nativeCamera && (
          <Button
            disabled={loading}
            onClick={handleTakePhoto}
            variant="secondary"
          >
            {loading ? 'Enviando...' : 'Tirar foto'}
          </Button>
        )}
        <Button
          disabled={loading}
          onClick={() => inputRef.current?.click()}
          variant="secondary"
        >
          <CiSaveUp2 />
          {loading ? 'Enviando...' : label}
        </Button>
      </div>
      {url && (
        <div style={{ marginTop: 8 }}>
          <small>URL:</small>
          <div>
            <a href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </div>
        </div>
      )}
      {error && (
        <div style={{ color: 'var(--color-danger)', marginTop: 8 }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default UploadButton;
