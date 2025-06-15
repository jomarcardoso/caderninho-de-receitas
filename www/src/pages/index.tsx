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
import { FoodsProvider } from '../providers/foods.provider';

const Index: FC<AppProps> = () => {
  return (
    <LoadingProvider>
      <FirebaseProvider>
        <FoodsProvider>
          <RecipesProvider>
            <ShoppingListProvider>
              <CurrentRecipeProvider>
                <NavigationProvider>
                  <EditingProvider>
                    <AppPage />
                  </EditingProvider>
                </NavigationProvider>
              </CurrentRecipeProvider>
            </ShoppingListProvider>
          </RecipesProvider>
        </FoodsProvider>
      </FirebaseProvider>
    </LoadingProvider>
  );
};

export default Index;
