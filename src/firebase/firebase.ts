import {
  getAuth,
  // signInWithPopup,
  // GoogleAuthProvider,
  User,
  // signOut,
} from 'firebase/auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import app from 'gatsby-plugin-firebase-v9.0';

// npm install firebase

// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyDHP6-sAs4qz57wZobWdaeE4DkeugXYR8g',
//   authDomain: 'caderninho-de-receitas.firebaseapp.com',
//   projectId: 'caderninho-de-receitas',
//   storageBucket: 'caderninho-de-receitas.appspot.com',
//   messagingSenderId: '909303160702',
//   appId: '1:909303160702:web:2b48872dc46031cda4dd2f',
//   measurementId: 'G-KFJQN1XXZP',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

getAnalytics(app);

export const auth = getAuth(app);

export const currentUser = auth.currentUser as User | undefined;

// if (typeof window !== 'undefined') {
//   const provider = new GoogleAuthProvider();

//   // signOut(auth);

//   signInWithPopup(auth, provider).then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);

//     if (credential) {
//       const token = credential.accessToken;

//       if (token) {
//         localStorage.setItem('google-auth', token);
//       }
//     }
//     // The signed-in user info.
//     // const { user } = result;
//     // ...
//   });
//   // .catch((error) => {
//   //   // Handle Errors here.
//   //   const errorCode = error.code;
//   //   const errorMessage = error.message;
//   //   // The email of the user's account used.
//   //   const { email } = error.customData;
//   //   // The AuthCredential type that was used.
//   //   const credential = GoogleAuthProvider.credentialFromError(error);
//   //   // ...
//   // });
// }
