import React, { FC } from 'react';
import Page from '../components/page/page';
import IndexContainer from '../panels';

import '../styles/main.scss';

const Index: FC = () => {
  return (
    <Page>
      <IndexContainer />
    </Page>
  );
};

export default Index;
