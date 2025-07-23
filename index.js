import express from "express";
import mongoose from "mongoose";
import { Product } from "./models/products.model.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("from the port 3000");
  res.send("Hello from server!!!");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product); 
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
