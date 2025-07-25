import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/products.routes.js";

const app = express();
const router = express.Router();

// middleware configuration
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes 
app.use("/api/products", productRoute)

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
