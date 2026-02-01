import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar"; // import your Navbar

export default function Home() {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Home content */}
      <div className="home simple-home">
        <h1>Welcome to ShopEase</h1>
        <p className="home-tagline">
          Quality products. Simple shopping.
        </p>
        <Link to="/products">
          <button className="primary-btn">
            View Products
          </button>
        </Link>
      </div>
    </>
  );
}
