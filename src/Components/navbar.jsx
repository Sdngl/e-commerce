import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { CartContext } from '../Context/cartcontext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
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
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
      </div>

      {/* Right: Login, Favourite, Cart */}
      <div className="navbar-right">
        <Link to="/login" className="login-button">Login</Link>
        <Link to="/favourites" className="favourite-button">
          Favourite
        </Link>
        <Link to="/cart" className="cart-button">
          Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
}
