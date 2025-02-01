require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const seedData = async () => {
  try {
    await Product.deleteMany({}); // Clear existing data
    const products = [
      {
        name: "Product 1",
        price: 100,
        description: "This is product 1",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Product 2",
        price: 200,
        description: "This is product 2",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Product 3",
        price: 300,
        description: "This is product 3",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Product 4",
        price: 400,
        description: "This is product 4",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Product 5",
        price: 500,
        description: "This is product 5",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Product 6",
        price: 600,
        description: "This is product 6",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Product 7",
        price: 700,
        description: "This is product 7",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Product 8",
        price: 800,
        description: "This is product 8",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Product 9",
        price: 900,
        description: "This is product 9",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Product 10",
        price: 1000,
        description: "This is product 10",
        image: "https://via.placeholder.com/150",
      },
    ];
    await Product.insertMany(products);
    console.log("Sample data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

seedData();