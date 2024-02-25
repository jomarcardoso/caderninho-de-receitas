import React, { FC } from 'react';
import Page, { PageProps } from '../components/page/page';
import AppPage from '../panels/app/app';

import '../styles/main.scss';
import { isMobile } from '../services/user-agent/user-agent.service';
import { DesktopApp } from '../desktop/app';

const Index: FC<PageProps> = () => {
  return <Page>{isMobile() ? <AppPage /> : <DesktopApp />}</Page>;
};

export default Index;
