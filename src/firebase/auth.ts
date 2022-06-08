import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  // signOut,
} from 'firebase/auth';

if (typeof window !== 'undefined') {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  console.log(auth);

  // signOut(auth);

  signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (credential) {
      const token = credential.accessToken;

      if (token) {
        localStorage.setItem('google-auth', token);
      }
    }
    // The signed-in user info.
    // const { user } = result;
    // ...
  });
  // .catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const { email } = error.customData;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });
}
