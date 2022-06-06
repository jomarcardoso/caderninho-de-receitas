// npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDHP6-sAs4qz57wZobWdaeE4DkeugXYR8g',
  authDomain: 'caderninho-de-receitas.firebaseapp.com',
  projectId: 'caderninho-de-receitas',
  storageBucket: 'caderninho-de-receitas.appspot.com',
  messagingSenderId: '909303160702',
  appId: '1:909303160702:web:2b48872dc46031cda4dd2f',
  measurementId: 'G-KFJQN1XXZP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

getAnalytics(app);
