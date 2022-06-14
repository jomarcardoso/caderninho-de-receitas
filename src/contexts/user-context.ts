import { Auth, User, OAuthCredential } from 'firebase/auth';
import { createContext } from 'react';

const FirebaseContext = createContext<{
  auth?: Auth;
  user?: User;
  credential?: OAuthCredential;
}>({});

export default FirebaseContext;
