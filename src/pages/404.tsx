import React, { FC } from 'react';

import Layout from '../components/layout/layout';

const NotFoundPage: FC = () => (
  <Layout headerProps={{ pageName: '404' }}>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
