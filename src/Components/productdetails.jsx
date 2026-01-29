import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const { id } = useParams(); // get id from URL
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);

  useEffect(() => {
    // Only fetch if product not passed via location.state
    if (!product) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          setProduct(response.data);
        } catch (err) {
          console.error('Failed to fetch product:', err);
        }
      };

      fetchProduct();
    }
  }, [id, product]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="200" />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      {/* <link to="/products">-Back to Products</link> */}
    </div>
  );
}
