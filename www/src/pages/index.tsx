import React, { FC } from 'react';
import AppPage, { AppProps } from '../panels/app/app';
import {
  CurrentRecipeProvider,
  EditingProvider,
  LoadingProvider,
  NavigationProvider,
  RecipesProvider,
  ShoppingListProvider,
} from '../providers';
import '../styles/main.scss';
import { LanguageProvider } from '../providers/language/language.provider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Index: FC<AppProps> = () => {
  return (
    <LoadingProvider>
      <GoogleOAuthProvider clientId="909303160702-r0lcfepjlhupmljhbadu9dvem7hcda2j.apps.googleusercontent.com">
        <RecipesProvider>
          <ShoppingListProvider>
            <LanguageProvider>
              <CurrentRecipeProvider>
                <NavigationProvider>
                  <EditingProvider>
                    <AppPage />
                  </EditingProvider>
                </NavigationProvider>
              </CurrentRecipeProvider>
            </LanguageProvider>
          </ShoppingListProvider>
        </RecipesProvider>
      </GoogleOAuthProvider>
    </LoadingProvider>
  );
};

export default Index;
