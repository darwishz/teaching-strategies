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
  apiKey: "AIzaSyCp8_Aa0rvfVbqZ1-PBY268npFiZkHd3Q8",
  authDomain: "eduinsight-92ac9.firebaseapp.com",
  projectId: "eduinsight-92ac9",
  storageBucket: "eduinsight-92ac9.firebasestorage.app",
  messagingSenderId: "136396813491",
  appId: "1:136396813491:web:5702cb10e37991ecb3acc6",
  measurementId: "G-N4BGF6DECK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);