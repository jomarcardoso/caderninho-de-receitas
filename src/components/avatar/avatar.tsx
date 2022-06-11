import React, { FC, ImgHTMLAttributes } from 'react';
import './avatar.scss';

export const Avatar: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  alt = '',
  ...props
}) => {
  return <img alt={alt} {...props} />;
};
