import { Auth, User, OAuthCredential } from 'firebase/auth';
import { createContext } from 'react';
import { FirebaseHook } from './firebase.hook';

export const FirebaseContext = createContext<FirebaseHook>({});
