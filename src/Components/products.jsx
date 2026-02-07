import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/cartcontext";
import "./products.css";

export default function Products() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToDetails = (id) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProductsList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <>
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover amazing products at great prices</p>
      </div>
      
      <div className="products-container">
        {productsList.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />

            <h3 className="product-title">{product.title}</h3>

            <p className="product-price">₹ {product.price.toFixed(2)}</p>

            <div className="product-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-count">(4.5)</span>
            </div>

            <div className="product-actions">
              <button 
                className="view-btn" 
                onClick={() => goToDetails(product.id)}
              >
                View Details
              </button>

              <button 
                className="add-btn" 
                onClick={() => {
                  addToCart(product);
                  alert('Added to cart!');
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
