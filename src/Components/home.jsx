import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
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
  );
}
