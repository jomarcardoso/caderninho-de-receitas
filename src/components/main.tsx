import React, { HTMLProps, FC } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Container, { ContainerProps } from './container/container';

interface Props {
  containerProps?: Omit<ContainerProps, 'children'>;
}

export type MainProps = HTMLProps<HTMLDivElement> & BoxProps & Props;

const Main: FC<MainProps> = ({ children = '', containerProps, ...props }) => (
  <Box component="main" role="main" my={5} {...props}>
    <Container maxWidth="md" {...containerProps}>
      {children || ''}
    </Container>
  </Box>
);

export default Main;
