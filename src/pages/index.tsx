import React, { FC } from 'react';
import Page, { PageProps } from '../components/page/page';
import AppPage from '../panels/app/app';

import '../styles/main.scss';

const Index: FC<PageProps> = () => {
  return (
    <Page>
      <AppPage />
    </Page>
  );
};

export default Index;
