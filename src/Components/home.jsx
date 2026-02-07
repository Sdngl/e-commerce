import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="home">
        <div className="home-content">
          <h1>Welcome to ShopEase</h1>
          <p className="tagline">
            Discover amazing products at unbeatable prices. 
            Quality shopping made simple.
          </p>
          <Link to="/products">
            <button className="primary-btn">
              Shop Now
            </button>
          </Link>
        </div>

        <div className="features">
          <div className="feature-card">
            <span className="feature-icon">🚀</span>
            <h3>Fast Delivery</h3>
            <p>Get your orders delivered quickly and safely to your doorstep</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">💳</span>
            <h3>Secure Payment</h3>
            <p>Safe and secure payment methods for your peace of mind</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🎁</span>
            <h3>Quality Products</h3>
            <p>Only the best products from trusted sellers and brands</p>
          </div>
        </div>
      </div>
    </>
  );
}
