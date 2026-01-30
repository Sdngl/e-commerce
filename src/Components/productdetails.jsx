import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../Context/cartcontext';


export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const{addtocart, cart}=React.useContext(CartContext);

  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${id}`
          );
          setProduct(response.data);
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      };

      fetchProduct();
    }
  }, [id, product]);

  if (!product) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="product-details">
      <h1>Product Details</h1>

      <img src={product.image} alt={product.title} />

      <h2>{product.title}</h2>

      <p><strong>Price:</strong> ₹ {product.price}</p>

      <p>{product.description}</p>

      <p className="product-category">
        Category: {product.category}
      </p>
      <button onClick={() => addtocart(product)}>Add to Cart</button>
      <br></br>
      <span> Item added to the cart is ${cart.length}</span>
    </div>
  );
}
