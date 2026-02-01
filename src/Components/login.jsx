// Components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./Login.css";

const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const navigate = useNavigate();

  // Controlled input state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // -------- Email/Password Login -----------
  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password;

    // Basic validation
    if (!trimmedEmail || !trimmedPassword) {
      alert("Please fill all fields");
      return;
    }

    if (trimmedPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );
      const user = userCredential.user;

      // Optional: fetch user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        console.log("User data:", userSnap.data());
      }

      navigate("/home"); // redirect after login
    } catch (error) {
      console.error(error.code, error.message);

      // Friendly error messages
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email format");
          break;
        case "auth/user-not-found":
          alert("No account found with this email");
          break;
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        default:
          alert(error.message);
      }
    }
  };

  // -------- Google Login -----------
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user in Firestore if new
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

      navigate("/home");
    } catch (error) {
      console.error(error.code, error.message);
      alert("Google login failed: " + error.message);
    }
  };

  // -------- Facebook Login Placeholder -----------
  const handleFacebookLogin = async () => {
    alert("Facebook login not implemented yet");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Email/Password Inputs */}
      <input
        type="email"
        placeholder="Email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      {/* Social Login Buttons */}
      <div className="social-buttons-container">
        <button className="social-btn google" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
        <button className="social-btn facebook" onClick={handleFacebookLogin}>
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}
