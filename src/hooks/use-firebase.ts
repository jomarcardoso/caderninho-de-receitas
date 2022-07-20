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
import { getFirestore, Firestore } from 'firebase/firestore';

import { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import app from 'gatsby-plugin-firebase-v9.0';

const token = localStorage.getItem('OAuthToken');

export const auth = getAuth(app);
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

const db = getFirestore(app);

export const useFirebase = (): FirebaseHook => {
  // const [db, setDB] = useState<Firestore>(defaultDB);
  const [user, setUser] = useState<User>(auth?.currentUser as User);
  const [credential, setCredential] = useState<OAuthCredential>(
    defaultCredential as OAuthCredential,
  );

  const login = useCallback(() => {
    const provider = new GoogleAuthProvider();

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
