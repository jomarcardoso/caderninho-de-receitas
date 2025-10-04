import React, { FC } from 'react';
import AppPage, { AppProps } from '../panels/app/app';
import {
  CurrentRecipeProvider,
  EditingProvider,
  LoadingProvider,
  NavigationProvider,
  DataProvider,
  // ShoppingListProvider,
} from '../providers';
import '../styles/main.scss';
import { LanguageProvider } from '../providers/language/language.provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '../config/google';

const Index: FC<AppProps> = () => {
  return (
    <LoadingProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <DataProvider>
          {/* <ShoppingListProvider> */}
          <LanguageProvider>
            <CurrentRecipeProvider>
              <NavigationProvider>
                <EditingProvider>
                  <AppPage />
                </EditingProvider>
              </NavigationProvider>
            </CurrentRecipeProvider>
          </LanguageProvider>
          {/* </ShoppingListProvider> */}
        </DataProvider>
      </GoogleOAuthProvider>
    </LoadingProvider>
  );
};

export default Index;

