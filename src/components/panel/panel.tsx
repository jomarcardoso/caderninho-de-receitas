import Box, { BoxProps } from '@mui/material/Box';
import React, { FC } from 'react';
import './panel.scss';

const Panel: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box className="panel" {...props}>
      <div className="panel__content">{children}</div>
    </Box>
  );
};

export default Panel;
