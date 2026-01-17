import {
  OAuthCredential,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  // User,
  // signOut,
  // onAuthStateChanged,
  User,
  Auth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDHP6-sAs4qz57wZobWdaeE4DkeugXYR8g',
  authDomain: 'caderninho-de-receitas.firebaseapp.com',
  databaseURL: 'https://caderninho-de-receitas-default-rtdb.firebaseio.com',
  projectId: 'caderninho-de-receitas',
  storageBucket: 'caderninho-de-receitas.appspot.com',
  messagingSenderId: '909303160702',
  appId: '1:909303160702:web:2b48872dc46031cda4dd2f',
  measurementId: 'G-KFJQN1XXZP',
};

function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('OAuthToken');
  }

  return '';
}

const app = initializeApp(FIREBASE_CONFIG);
const token = getToken();
const auth = getAuth(app);
const db = getFirestore(app);

// TODO: salvar token no localStorage
const defaultCredential = token
  ? GoogleAuthProvider.credential(token)
  : undefined;

export interface FirebaseHook {
  auth?: Auth;
  user?: User;
  credential?: OAuthCredential;
  db?: Firestore;
  login?(): void;
  logout?(): void;
}

export const useFirebase = (): FirebaseHook => {
  const [user, setUser] = useState<User>(auth?.currentUser as User);
  const [credential, setCredential] = useState<OAuthCredential>(
    defaultCredential as OAuthCredential,
  );

  const login = useCallback(() => {
    const provider = new GoogleAuthProvider();

    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          if (!result) {
            return;
          }

          setUser(result.user);

          // This gives you a Google Access Token. You can use it to access the Google API.
          const newCredential = GoogleAuthProvider.credentialFromResult(result);
          // The signed-in user info.
          // ...

          if (newCredential) {
            setCredential(newCredential);

            if (newCredential.accessToken) {
              localStorage.setItem('OAuthToken', newCredential.accessToken);
            }
          }
        })
        .catch((error) => {
          // The AuthCredential type that was used.
          const newCredential = GoogleAuthProvider.credentialFromError(error);

          if (newCredential) {
            setCredential(newCredential);
          }
        });
    } catch (e) {
      console.log('erro ao fazer login', e);
    }
  }, []);

  function logout() {
    signOut(auth);

    setUser(undefined as unknown as User);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => setUser(newUser as User));
  }, []);

  return {
    db,
    auth,
    user,
    credential,
    login,
    logout,
  };
};
