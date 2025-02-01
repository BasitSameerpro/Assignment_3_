require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Start the server
const app = express();
const PORT = process.env.PORT || 5000;


// Add cors middleware
app.use(cors());

app.use(express.json());
app.use(express.json());

// Routes
const productRoutes = require("./api/productRoutes");
const cartRoutes = require("./api/cartRoutes");

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});