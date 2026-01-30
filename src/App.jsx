import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/home';
import Products from './Components/products';
import ProductDetails from './Components/productdetails';
import './App.css';
import { CartContext } from './Context/cartcontext';

function App() {
  return (
    <div>
      {/* Optional navigation */}
      

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
