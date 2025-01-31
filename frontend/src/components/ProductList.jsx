import React from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    axios.get(`${API_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (productId) => {
    const API_URL = import.meta.env.VITE_API_URL;

    axios.post(`${API_URL}/cart`, {
      userId: "user123",
      productId,
      quantity: 1,
    })
      .then((res) => console.log("Added to cart:", res.data))
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    width: "200px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  },
};

export default ProductList;