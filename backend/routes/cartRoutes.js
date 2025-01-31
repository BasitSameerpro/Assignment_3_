const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const router = express.Router();

// POST /cart
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validate request body
  if (!userId || !productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productExists = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (productExists) {
      productExists.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Error in POST /cart:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

// PUT /cart/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  // Validate request body
  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error in PUT /cart/:id:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

// DELETE /cart/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;

  // Validate request body
  if (!productId) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Error in DELETE /cart/:id:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

// GET /cart/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findOne({ userId: id }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const totalPrice = cart.products.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    res.json({ cart, totalPrice });
  } catch (error) {
    console.error("Error in GET /cart/:id:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

module.exports = router;