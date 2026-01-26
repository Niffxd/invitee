// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwMPZ2mMtlbKRCgACw8NkOFq9LMa_XPq4",
  authDomain: "invitee-c68f4.firebaseapp.com",
  projectId: "invitee-c68f4",
  storageBucket: "invitee-c68f4.firebasestorage.app",
  messagingSenderId: "671160514997",
  appId: "1:671160514997:web:4b7c90c2790f60348001fc",
  measurementId: "G-H5ET4SDYRL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
