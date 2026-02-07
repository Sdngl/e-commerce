import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/home";
import Products from "./Components/products";
import ProductDetails from "./Components/productdetails";
import Login from "./Components/login";
import Register from "./Components/register";
import Cart from "./Components/cart";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Login page (no navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* Register page (no navbar) */}
        <Route path="/register" element={<Register />} />

        {/* Pages with navbar */}
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* Catch-all: redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
