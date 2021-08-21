import React, { FC } from 'react';
import Advertise from '../components/advertise';
import Layout from '../components/layout/layout';

const AdvertisePage: FC = () => (
  <Layout headerProps={{ pageName: 'Esclarecimentos' }}>
    <Advertise />
  </Layout>
);

export default AdvertisePage;
