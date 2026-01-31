import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/cartcontext";
import "./Products.css";

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

          {/* Buttons side by side */}
          <div className="product-actions">
            <button onClick={() => goToDetails(product.id)}>
              View Details
            </button>

            <button onClick={() => addToCart(product)}>
              🛒 Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
