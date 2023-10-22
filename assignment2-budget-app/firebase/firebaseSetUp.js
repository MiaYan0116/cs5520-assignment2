// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVjZgNvNNVVt9srA62GPXXVf1H2tEXdss",
  authDomain: "cs5520-assignment2-a50e7.firebaseapp.com",
  projectId: "cs5520-assignment2-a50e7",
  storageBucket: "cs5520-assignment2-a50e7.appspot.com",
  messagingSenderId: "353061389376",
  appId: "1:353061389376:web:caee32fb2d6f1f1cd34ba5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();