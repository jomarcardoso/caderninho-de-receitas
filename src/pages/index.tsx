import React, { FC } from 'react';
import AppPage, { AppProps } from '../panels/app/app';
import {
  CurrentRecipeProvider,
  EditingProvider,
  FirebaseProvider,
  LoadingProvider,
  NavigationProvider,
  RecipesProvider,
  ShoppingListProvider,
} from '../providers';
import '../styles/main.scss';

const Index: FC<AppProps> = () => {
  return (
    <FirebaseProvider>
      <RecipesProvider>
        <ShoppingListProvider>
          <CurrentRecipeProvider>
            <NavigationProvider>
              <LoadingProvider>
                <EditingProvider>
                  <AppPage />
                </EditingProvider>
              </LoadingProvider>
            </NavigationProvider>
          </CurrentRecipeProvider>
        </ShoppingListProvider>
      </RecipesProvider>
    </FirebaseProvider>
  );
};

export default Index;
