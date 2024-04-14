import React, { FC } from 'react';
import AppPage, { AppProps } from '../panels/app/app';
import {
  CurrentRecipeProvider,
  FirebaseProvider,
  FoodsProvider,
  LoadingProvider,
  NavigationProvider,
  RecipesProvider,
} from '../providers';
import '../styles/main.scss';

const Index: FC<AppProps> = () => {
  return (
    <FirebaseProvider>
      <FoodsProvider>
        <RecipesProvider>
          <CurrentRecipeProvider>
            <NavigationProvider>
              <LoadingProvider>
                <AppPage />
              </LoadingProvider>
            </NavigationProvider>
          </CurrentRecipeProvider>
        </RecipesProvider>
      </FoodsProvider>
    </FirebaseProvider>
  );
};

export default Index;
