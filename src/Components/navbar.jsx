import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { CartContext } from '../Context/cartcontext';

export default function Navbar() {
    const{ cart } = useContext(CartContext);
    
  return (
    <nav className="navbar">
      {/* Left: Brand */}
      <div className="navbar-left">
        <Link to="/" className="brand">
          ShopEase
        </Link>
      </div>

      {/* Middle: Navigation Links */}
      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
      </div>

      {/* Right: Login, Favourite, Cart */}
      <div className="navbar-right">
        <button className="login-button">Login</button>
        <Link to="/favourites" className="favourite-button">
          Favourite
        </Link>
        <Link to="/cart" className="cart-button">
          Cart-{cart.length}
        </Link>
      </div>
    </nav>
  );
}
