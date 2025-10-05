import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import { App } from './app';
import { GOOGLE_CLIENT_ID } from './config/google';
import '@fontsource/dosis';
import '@fontsource/cinzel';
import '@fontsource/vibur';

import {
  CurrentRecipeProvider,
  EditingProvider,
  LoadingProvider,
  NavigationProvider,
  DataProvider,
} from './providers';
import { LanguageProvider } from './providers/language/language.provider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Root = () => (
  <LoadingProvider>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <DataProvider>
        <LanguageProvider>
          <CurrentRecipeProvider>
            <NavigationProvider>
              <EditingProvider>
                <App />
              </EditingProvider>
            </NavigationProvider>
          </CurrentRecipeProvider>
        </LanguageProvider>
      </DataProvider>
    </GoogleOAuthProvider>
  </LoadingProvider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
