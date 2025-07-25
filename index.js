import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/products.routes.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// ✅ Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Serve the frontend files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// routes 
app.use("/api/products", productRoute);

// DB connection and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the database!");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("Could not connect to the db"));
