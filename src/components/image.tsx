import React, { FC, ReactElement } from 'react';
import MaterialImage, { ImageProps } from 'material-ui-image';

const Image: FC<ImageProps> = ({ alt = '', ...props }): ReactElement => {
  return (
    <MaterialImage
      imageStyle={{ width: '100%' }}
      style={{ width: '100%' }}
      alt={alt}
      {...props}
    />
  );
};

export default Image;
