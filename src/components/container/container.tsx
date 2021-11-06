import React, { FC } from 'react';
import Container, {
  ContainerProps as MUIContainerProps,
} from '@mui/material/Container';

export type ContainerProps = MUIContainerProps;

const Main: FC<ContainerProps> = ({ children, ...props }) => (
  <Container maxWidth="md" {...props}>
    {children || ''}
  </Container>
);

export default Main;
