import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/home";
import Products from "./Components/products";
import ProductDetails from "./Components/productdetails";
import Login from "./Components/login";
import Register from "./Components/register";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        {/* Default route / goes to Login */}
        <Route path="/" element={<Login />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* Home & Products pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Catch-all: redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
