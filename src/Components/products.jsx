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

  useEffect(() => {
    // async function inside useEffect
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProductsList(response.data);
        console.log(response.data); 
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts(); // call the async function
  }, []); // empty dependency array → runs once on mount

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {productsList.map((product) => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            width: '200px',
            textAlign: 'center',
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '150px', height: '150px', objectFit: 'contain' }}
          />
          <h3 style={{ fontSize: '16px', margin: '10px 0' }}>
            {product.title}
          </h3>
          <p style={{ fontWeight: 'bold' }}>₹ {product.price}</p>
          <button onClick={() => goToDetails(product.id)}>View Details</button>
        </div>
      ))}
    </div>
  );
}
