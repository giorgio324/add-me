import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDdJtJJRQuZK6TUG8RkZj_25qArI_qjMLY',
  authDomain: 'add-me-97116.firebaseapp.com',
  projectId: 'add-me-97116',
  storageBucket: 'add-me-97116.appspot.com',
  messagingSenderId: '222869205320',
  appId: '1:222869205320:web:92c1d4bda0e9c8a6bc837d',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
