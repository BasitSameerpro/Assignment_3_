import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    axios.get(`${API_URL}/cart/user123`)
      .then((res) => setCart(res.data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const handleRemoveFromCart = (productId) => {
    const API_URL = import.meta.env.VITE_API_URL;

    axios.delete(`${API_URL}/cart/user123`, { data: { productId } })
      .then((res) => {
        console.log("Removed from cart:", res.data);
        setCart(res.data); // Update cart state
      })
      .catch((error) => console.error("Error removing from cart:", error));
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cart.cart.products.map((item) => (
          <div key={item.productId._id} style={styles.card}>
            <img src={item.productId.image} alt={item.productId.name} style={styles.image} />
            <h3>{item.productId.name}</h3>
            <p>${item.productId.price} x {item.quantity}</p>
            <p>Total: ${item.productId.price * item.quantity}</p>
            <button onClick={() => handleRemoveFromCart(item.productId._id)}>Remove</button>
          </div>
        ))}
        <h2>Total: ${cart.totalPrice}</h2>
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

export default Cart;