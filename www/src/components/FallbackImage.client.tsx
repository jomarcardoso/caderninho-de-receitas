"use client";

import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  srcs?: string[];
};

export default function FallbackImage({ srcs = [], ...imgProps }: Props) {
  const list = Array.isArray(srcs) ? srcs.filter(Boolean) : [];
  const [index, setIndex] = React.useState(0);

  const handleError = () => {
    const next = index + 1;
    if (next < list.length) setIndex(next);
  };

  return (
    <img
      {...imgProps}
      src={list[index] || ''}
      onError={handleError}
    />
  );
}

