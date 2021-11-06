import React, { FC, ImgHTMLAttributes, ReactElement } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = ({ paddingBottom = '100%' }) =>
  makeStyles({
    root: {
      width: '100%',
    },
    container: {
      position: 'relative',

      '&::before': {
        content: '""',
        display: 'block',
        paddingBottom,
      },
    },
    img: {
      position: 'absolute',
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    },
  });

interface Props {
  aspectRatio?: number;
}

type ImageProps = Props & ImgHTMLAttributes<HTMLImageElement>;

const Image: FC<ImageProps> = ({
  alt = '',
  className = '',
  aspectRatio = 1,
  ...props
}): ReactElement => {
  const paddingBottom = `${100 - (aspectRatio * 100 - 100)}%`;
  const classes = useStyles({ paddingBottom })();

  return (
    <div className={classes.root}>
      <div className={className}>
        <div className={classes.container}>
          <img alt={alt} className={classes.img} {...props} />
        </div>
      </div>
    </div>
  );
};

export default Image;
