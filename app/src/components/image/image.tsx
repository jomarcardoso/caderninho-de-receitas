import { type FC, type ImgHTMLAttributes, type ReactElement, useEffect, useState } from 'react';
import './image.scss';

interface Props {
  aspectRatio?: number;
  transparent?: boolean;
  srcs?: string[];
}

type ImageProps = Props & ImgHTMLAttributes<HTMLImageElement>;

const Image: FC<ImageProps> = ({
  alt = '',
  transparent = false,
  className = '',
  aspectRatio = 1,
  src = '',
  srcs = [],
  ...props
}): ReactElement => {
  const paddingBottom = `${100 - (aspectRatio * 100 - 100)}%`;
  const sources = Array.isArray(srcs) && srcs.length > 0 ? srcs : (src ? [src] : []);
  const [index, setIndex] = useState<number>(0);
  const [stagedSrc, setStagedSrc] = useState<string>(sources[0] ?? '');

  useEffect(() => {
    const list = Array.isArray(srcs) && srcs.length > 0 ? srcs : (src ? [src] : []);
    setIndex(0);
    setStagedSrc('');
    setTimeout(() => {
      setStagedSrc(list[0] ?? '');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, Array.isArray(srcs) ? srcs.join('|') : '']);

  const handleError = () => {
    const list = sources;
    const next = index + 1;
    if (next < list.length) {
      setIndex(next);
      setStagedSrc(list[next]);
    }
  };

  return (
    <div
      className={`image ${className} ${
        transparent ? 'image--transparent' : ''
      }`}
    >
      <div className="image__container">
        <div className="image__padding" style={{ paddingBottom }} />
        <img alt={alt} className="image__img" src={stagedSrc} onError={handleError} {...props} />
      </div>
    </div>
  );
};

export default Image;
