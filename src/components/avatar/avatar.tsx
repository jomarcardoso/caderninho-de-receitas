import React, { FC, ImgHTMLAttributes, useState, useEffect } from 'react';

import { generateCSSClasses } from '../../services/dom/classes';
import './avatar.scss';

export const Avatar: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  alt = ' ',
  className = '',
  ...props
}) => {
  const [hideImage, setHideImage] = useState(false);
  const classes = generateCSSClasses({
    avatar: true,
    [className]: className,
  });

  useEffect(() => {
    setHideImage(false);
  }, [props.src]);

  return (
    <div className={classes}>
      <img src="/images/decorations/chef.png" alt="" width="0" height="0" />
      {!hideImage && (
        <img
          alt={alt}
          className="avatar__img"
          onError={() => setHideImage(true)}
          {...props}
        />
      )}
    </div>
  );
};
