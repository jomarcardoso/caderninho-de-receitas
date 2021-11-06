import Box, { BoxProps } from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';

const useStyles = makeStyles({
  root: {
    // backgroundColor: light,
    flexShrink: 0,
    width: '100vw',
    height: '100%',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  content: {
    // backgroundImage: 'url(/images/textures/paper-texture.png)',
    minHeight: '100%',
    position: 'relative',

    '&:before': {
      display: 'block',
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url(/images/textures/paper-texture.png)',
      filter: 'contrast(1.1)',
      zIndex: -1,
    },
  },
});

const Panel: FC<BoxProps> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} {...props}>
      <div className={classes.content}>{children}</div>
    </Box>
  );
};

export default Panel;
