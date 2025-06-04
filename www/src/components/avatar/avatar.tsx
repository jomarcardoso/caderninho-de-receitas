import React, { FC, ImgHTMLAttributes, useState, useEffect } from 'react';

import { generateClasses } from '../../services/dom/classes';
import './avatar.scss';

export const Avatar: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  alt = ' ',
  className = '',
  ...props
}) => {
  const [hideImage, setHideImage] = useState(true);
  const classes = generateClasses({
    avatar: true,
    [className]: className,
  });

  useEffect(() => {
    setHideImage(!props.src);
  }, [props.src]);

  return (
    <div className={classes}>
      {!hideImage ? (
        <img
          alt={alt}
          className="avatar__img"
          onError={() => setHideImage(true)}
          {...props}
        />
      ) : (
        <img src="/images/decorations/chef.png" alt="" width="0" height="0" />
      )}
    </div>
  );
};
