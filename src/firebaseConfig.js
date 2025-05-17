// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3ek_bLHFjyXbutehFPE0XTtOXLjkfbYk",
  authDomain: "eduinsight-b4d1e.firebaseapp.com",
  projectId: "eduinsight-b4d1e",
  storageBucket: "eduinsight-b4d1e.firebasestorage.app",
  messagingSenderId: "612521700489",
  appId: "1:612521700489:web:d976aabf22178410692a58",
  measurementId: "G-STHC73SBP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // eslint-disable-line no-unused-vars
export const auth = getAuth(app);
export const db = getFirestore(app);