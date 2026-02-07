import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./login.css";

const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          const user = result.user;
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
        }
      })
      .catch((error) => {
        console.error("Google login redirect failed:", error.code, error.message);
        alert("Google login failed: " + error.message);
      });
  }, [navigate]);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password;

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please fill all fields");
      return;
    }

    if (trimmedPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        console.log("User data:", userSnap.data());
      }

      navigate("/home");
    } catch (error) {
      console.error(error.code, error.message);
      setLoading(false);
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

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Google login failed:", error.code, error.message);
      alert("Google login failed: " + error.message);
    }
  };

  const handleFacebookLogin = async () => {
    alert("Facebook login not implemented yet");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue shopping</p>

        <div className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button 
            className={`login-btn ${loading ? 'loading' : ''}`} 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? '' : 'Sign In'}
          </button>
        </div>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-buttons-container">
          <button className="social-btn google" onClick={handleGoogleLogin}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          <button className="social-btn facebook" onClick={handleFacebookLogin}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
