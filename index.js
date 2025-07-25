import express from "express";
import mongoose from "mongoose";
import { Product } from "./models/products.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// checking for the server running
app.get("/", (req, res) => {
  console.log("from the port 3000");
  res.send("Hello from server!!!");
});

// get all the products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// for getting a specific product based on the id
app.get("/api/product/:id", async (req, res) => {
  try {
    // getting the product id from the url
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add a new product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update a product
app.put("/api/product/:id", async (req, res) => {
  console.log("The request body is: ", req.body);
  console.log("The product is: ", req.params.id);
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation runs
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a product by id
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({message: "Product deleted successfully!"});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// better practice - to connect to the db first and then start the server
mongoose
  .connect(
    "mongodb+srv://shiwanisoni:9TQRXPxSRPP94ds6@cluster0.yirabil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to the database!");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("Could not connect to the db"));
