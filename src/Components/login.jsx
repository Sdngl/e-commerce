// Components/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // import the CSS file

export default function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>

      <input type="email" placeholder="Email" className="login-input" />
      <input type="password" placeholder="Password" className="login-input" />
      <button className="login-btn">Login</button>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      <div className="social-buttons-container">
  <button className="social-btn google">Sign in with Google</button>
  <button className="social-btn facebook">Sign in with Facebook</button>
</div>

    </div>
  );
}
