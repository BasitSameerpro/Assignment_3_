import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
    </nav>
  );
};

export default Navbar;