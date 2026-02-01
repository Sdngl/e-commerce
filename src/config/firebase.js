// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce-6a435.firebaseapp.com",
  projectId: "e-commerce-6a435",
  storageBucket: "e-commerce-6a435.firebasestorage.app",
  messagingSenderId: "236968185773",
  appId: "1:236968185773:web:997135f48d2cfa01755b24",
  measurementId: "G-MQRLYFVDW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize core services
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Safe analytics init
export let analytics = null;

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

// Optional default export
export default app;
