import Container from '@mui/material/Container';
import React, { FC } from 'react';
import { Button } from '../components/button';
import Page, { PageProps } from '../components/page/page';

import '../styles/main.scss';

const Index: FC<PageProps> = () => {
  return (
    <Page>
      <Container>
        <Button>oi</Button>
      </Container>
    </Page>
  );
};

export default Index;
