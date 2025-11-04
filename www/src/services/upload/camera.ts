import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export function isNativeCameraAvailable(): boolean {
  try {
    const platform = Capacitor.getPlatform?.() || 'web';
    return platform === 'ios' || platform === 'android';
  } catch {
    return false;
  }
}

export async function takePhotoAsFile(opts?: {
  quality?: number; // 1..100
  width?: number; // resize width
  resultType?: CameraResultType;
}): Promise<File> {
  const quality = opts?.quality ?? 85;
  const width = opts?.width ?? 1280;
  const resultType = opts?.resultType ?? CameraResultType.Uri;

  const photo = await Camera.getPhoto({
    source: CameraSource.Camera,
    resultType,
    quality,
    width,
    correctOrientation: true,
    saveToGallery: false,
  });

  const uri = photo.webPath || photo.path || photo.savePath || photo.dataUrl;
  if (!uri) throw new Error('Falha ao capturar imagem');

  // Para Uri/DataUrl, converte em Blob e File
  if (uri.startsWith('data:')) {
    const res = await fetch(uri);
    const blob = await res.blob();
    return new File([blob], `photo_${Date.now()}.jpeg`, { type: blob.type || 'image/jpeg' });
  }

  const res = await fetch(uri);
  const blob = await res.blob();
  const ext = blob.type?.split('/')?.[1] || 'jpeg';
  return new File([blob], `photo_${Date.now()}.${ext}`, { type: blob.type || 'image/jpeg' });
}

