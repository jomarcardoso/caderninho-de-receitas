import React, { FC, ImgHTMLAttributes, ReactElement, useEffect } from 'react';
import './image.scss';

interface Props {
  aspectRatio?: number;
  transparent?: boolean;
}

type ImageProps = Props & ImgHTMLAttributes<HTMLImageElement>;

const Image: FC<ImageProps> = ({
  alt = '',
  transparent = false,
  className = '',
  aspectRatio = 1,
  src = '',
  ...props
}): ReactElement => {
  const paddingBottom = `${100 - (aspectRatio * 100 - 100)}%`;
  const [stagedSrc, setStagedSrc] = React.useState<string>(src);

  useEffect(() => {
    setStagedSrc('');

    setTimeout(() => {
      setStagedSrc(src);
    });
  }, [src]);

  return (
    <div
      className={`image ${className} ${
        transparent ? 'image--transparent' : ''
      }`}
    >
      <div className="image__container">
        <div className="image__padding" style={{ paddingBottom }} />
        <img alt={alt} className="image__img" src={stagedSrc} {...props} />
      </div>
    </div>
  );
};

export default Image;
