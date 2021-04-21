import React, { HTMLProps, FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const Main: FC<HTMLProps<HTMLDivElement>> = ({ children = '', ...props }) => (
  <Box component="main" role="main" my={5} {...props}>
    <Container maxWidth="md">{children || ''}</Container>
  </Box>
);

export default Main;
