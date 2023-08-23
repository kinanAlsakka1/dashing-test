// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore , memoryLocalCache } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword , signOut} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjMleS2Fn34drjwebrF3GGSGDLxOtqhJ8",
  authDomain: "dashing-77602.firebaseapp.com",
  projectId: "dashing-77602",
  storageBucket: "dashing-77602.appspot.com",
  messagingSenderId: "593190649296",
  appId: "1:593190649296:web:7f55cda70d59d9843ecdd5",
  measurementId: "G-H6FH27RHBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = initializeFirestore(app, {localCache: memoryLocalCache()});

const auth = getAuth();

export { db , auth , signInWithEmailAndPassword , signOut };