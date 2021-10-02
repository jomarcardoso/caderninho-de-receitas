import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC, HTMLProps } from 'react';

const useStyles = makeStyles({
  root: {
    // backgroundColor: light,
    flexShrink: 0,
    width: '100vw',
    height: '100%',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
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
      filter: 'opacity(.45)',
      zIndex: -1,
    },
  },
});

const Panel: FC<HTMLProps<HTMLDivElement>> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} {...props}>
      <div className={classes.content}>{children}</div>
    </Box>
  );
};

export default Panel;
