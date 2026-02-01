// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUBF1w27rA14QfGTt4GJgTmJIZULpzQTg",
  authDomain: "e-commerce-6a435.firebaseapp.com",
  projectId: "e-commerce-6a435",
  storageBucket: "e-commerce-6a435.firebasestorage.app",
  messagingSenderId: "236968185773",
  appId: "1:236968185773:web:997135f48d2cfa01755b24",
  measurementId: "G-MQRLYFVDW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);