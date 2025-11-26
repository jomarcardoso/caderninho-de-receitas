'use client'; // ❗ apenas se este componente estiver chamado diretamente da page

import { useState } from 'react';
import type { FC, ImgHTMLAttributes, ReactElement } from 'react';
import './image.scss';

interface Props {
  aspectRatio?: number;
  transparent?: boolean;
  srcs?: string[];
  objectFitCompatible?: boolean;
}

type Image2Props = Props & ImgHTMLAttributes<HTMLImageElement>;

export const Image2: FC<Image2Props> = ({
  alt = '',
  transparent = false,
  className = '',
  aspectRatio = 1,
  src = '',
  objectFitCompatible = false,
  srcs = [],
  style,
  ...props
}): ReactElement => {
  const sources = srcs?.length ? srcs : src ? [src] : [];
  const [index, setIndex] = useState(0);
  const current = sources[index] ?? '';

  const handleError = () => {
    if (index + 1 < sources.length) {
      setIndex(index + 1);
    }
  };

  return (
    <div
      style={style}
      className={`image ${className} ${
        transparent ? 'image--transparent' : ''
      }`}
    >
      <div className="image__container">
        <div
          className="image__padding"
          style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
        />
        {!objectFitCompatible ? (
          <img
            key={sources.join('|')} // reset quando src mudar
            alt={alt}
            className="image__img"
            src={current}
            onError={handleError}
            {...props}
          />
        ) : (
          <div
            className="image__img"
            key={sources.join('|')}
            aria-label={alt}
            role="img"
            style={{ backgroundImage: current ? `url(${current})` : undefined }}
            onError={handleError}
            {...props}
          />
        )}
      </div>
    </div>
  );
};
