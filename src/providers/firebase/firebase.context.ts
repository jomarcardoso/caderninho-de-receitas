import { Auth, User, OAuthCredential } from 'firebase/auth';
import { createContext } from 'react';

export const FirebaseContext = createContext<{
  auth?: Auth;
  user?: User;
  credential?: OAuthCredential;
  login?(): void;
  logout?(): void;
}>({});
