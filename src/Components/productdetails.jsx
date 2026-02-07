import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../Context/cartcontext';
import './products.css';


export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = React.useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="loading">
        <p>Product not found</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="product-details-image">
        <img src={product.image} alt={product.title} />
      </div>
      
      <div className="product-details-info">
        <span className="category">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="price">₹ {product.price.toFixed(2)}</p>
        
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-count">(4.5)</span>
        </div>
        
        <p className="description">{product.description}</p>
        
        <div className="product-details-actions">
          <button 
            className="add-cart-btn" 
            onClick={() => {
              addToCart(product);
              alert('Added to cart!');
            }}
          >
            Add to Cart
          </button>
          <button className="buy-btn" onClick={() => alert('Buy now coming soon!')}>
            Buy Now
          </button>
        </div>
        
        <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#94a3b8' }}>
          🛒 {cart.length} items in cart
        </p>
      </div>
    </div>
  );
}
