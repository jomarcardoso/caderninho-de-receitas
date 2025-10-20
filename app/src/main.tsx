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
import { attachCacheDebug } from './debug/cache-debug';
import { HealthProvider } from './providers';

const Root = () => (
  <LoadingProvider>
    <HealthProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <DataProvider>
          <LanguageProvider>
            <NavigationProvider>
              <CurrentRecipeProvider>
                <EditingProvider>
                  <App />
                </EditingProvider>
              </CurrentRecipeProvider>
            </NavigationProvider>
          </LanguageProvider>
        </DataProvider>
      </GoogleOAuthProvider>
    </HealthProvider>
  </LoadingProvider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

// Attach cache debug helpers (safe no-op in prod)
try { attachCacheDebug(); } catch {}
