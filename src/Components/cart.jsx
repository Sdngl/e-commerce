import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/cartcontext';
import './cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-wrapper">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products">
              <button className="continue-shopping-btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="cart-count">{cart.length} items</span>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">₹ {item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="amount">₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="amount">
                {shipping === 0 ? 'Free' : `₹ ${shipping.toFixed(2)}`}
              </span>
            </div>
            {subtotal < 100 && (
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>
                Add ₹ {(100 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
            <div className="summary-row total">
              <span>Total</span>
              <span className="amount">₹ {total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={() => alert('Checkout coming soon!')}>
              Proceed to Checkout
            </button>
            <p className="secure-checkout">
              🔒 Secure checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
