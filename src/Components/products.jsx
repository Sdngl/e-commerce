import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Products() {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const addToCart = (product) => {
    // For now, just log the product; later you can integrate cart state or API
    console.log('Added to cart:', product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProductsList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h2 className="loading">Loading products...</h2>;

  return (
    <div className="products-container">
      {productsList.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />

          <h3 className="product-title">{product.title}</h3>

          <p className="product-price">₹ {product.price}</p>

          {/* Buttons container */}
          <div className="product-buttons">
            <button className="view-details" onClick={() => goToDetails(product.id)}>
              View Details
            </button>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              🛒 Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
