// Components/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import "./Register.css"; // import the CSS file

const provider = new GoogleAuthProvider();

export default function Register() {
  const navigate = useNavigate();

  // State for email/password registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ----------- Email/Password Registration -----------
  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set display name
      await updateProfile(user, { displayName: name });

      // Save to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name,
        email,
        authProvider: "password",
        createdAt: new Date(),
      });

      navigate("/home"); // redirect after signup
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  // ----------- Google Sign-In -----------
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user in Firestore if not exists
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          authProvider: "google",
          createdAt: new Date(),
        });
      }

      navigate("/home"); // redirect after login
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  // ----------- Facebook Sign-In (placeholder) -----------
  const signInWithFacebook = async () => {
    alert("Facebook login not implemented yet");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      {/* Email/Password Registration Form */}
      <input
        type="text"
        placeholder="Name"
        className="register-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="register-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="register-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>

      {/* Social Sign-In Buttons */}
      <div className="social-buttons-container">
        <button className="social-btn google" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <button className="social-btn facebook" onClick={signInWithFacebook}>
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}
