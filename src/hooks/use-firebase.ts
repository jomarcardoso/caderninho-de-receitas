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
} from 'firebase/auth';
import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import app from 'gatsby-plugin-firebase-v9.0';

export const auth = getAuth(app);
// TODO: salvar token no localStorage
const defaultCredential = GoogleAuthProvider.credential(
  localStorage.getItem('OAuthToken'),
);

export const useFirebase = (): {
  auth?: Auth;
  user?: User;
  credential?: OAuthCredential;
} => {
  const [user, setUser] = useState<User>(auth?.currentUser as User);
  const [credential, setCredential] =
    useState<OAuthCredential>(defaultCredential);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => setUser(newUser as User));
  }, []);

  useEffect(() => {
    const provider = new GoogleAuthProvider();

    if (credential) {
      return;
    }

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
  }, [credential]);

  console.log({
    auth,
    user,
    credential,
  });

  return {
    auth,
    user,
    credential,
  };
};
