import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/products.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const router = express.Router();

// middleware configuration
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes 
app.use("/api/products", productRoute)

// better practice - to connect to the db first and then start the server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the database!");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("Could not connect to the db"));
