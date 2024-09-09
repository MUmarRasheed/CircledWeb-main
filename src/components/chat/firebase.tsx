// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuRAUqf-B0C0YsudbI5yovSe0gsKxUhxc",
  authDomain: "circled-66a51.firebaseapp.com",
  projectId: "circled-66a51",
  storageBucket: "circled-66a51.appspot.com",
  messagingSenderId: "551068958386",
  appId: "1:551068958386:web:fa15b4bdf870ea9a0853ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const db = getFirestore(app);
