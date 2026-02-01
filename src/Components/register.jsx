// Components/Register.jsx
import React from "react";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Register.css"; // import the CSS file
import { auth, db } from "../config/firebase";


const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    authProvider: "google",
    email: user.email,
  });
};

export default function Register() {
  return (
    <div className="register-container">
      <h2>Register</h2>

      <input type="text" placeholder="Name" className="register-input" />
      <input type="email" placeholder="Email" className="register-input" />
      <input type="password" placeholder="Password" className="register-input" />
      <button className="register-btn">Register</button>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>

      <div className="social-buttons-container">
  <button className="social-btn google" onClick={signInWithGoogle}>
    Sign in with Google
  </button>
  <button className="social-btn facebook">
    Sign in with Facebook
  </button>
</div>

    </div>
  );
}
