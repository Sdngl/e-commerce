import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to our store!</p>
      <Link to="/products">
        <button>Go to Products</button>
      </Link>
    </div>
  );
}
