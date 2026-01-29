import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/home';
import Products from './Components/products';
import ProductDetails from './Components/productdetails';
import './App.css';

function App() {
  return (
    <div>
      {/* Optional navigation */}
      <nav>
        <Link to="/">Home</Link> | <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
