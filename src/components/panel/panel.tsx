import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC, HTMLProps } from 'react';
import { light } from '../page/page';

const useStyles = makeStyles({
  root: {
    backgroundColor: light,
    flexShrink: 0,
    width: '100vw',
    height: '100%',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
    overflowY: 'auto',
  },
});

const Panel: FC<HTMLProps<HTMLDivElement>> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} {...props}>
      {children}
    </Box>
  );
};

export default Panel;
