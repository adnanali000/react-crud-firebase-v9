import firebase from 'firebase/compat/app';
import {getFirestore} from '@firebase/firestore';

require('dotenv').config();



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: "react-crud-66f0f.firebaseapp.com",
    projectId: "react-crud-66f0f",
    storageBucket: "react-crud-66f0f.appspot.com",
    messagingSenderId: "409563616666",
    appId: "1:409563616666:web:07fb3ccf5baa2de0f55623"
  };

const app = firebase.initializeApp(firebaseConfig);
export const fireDb = getFirestore(app);