import mongoose, { model } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "This is a required field."],
    },

    quantity: {
      type: Number,
      required: [true, "This is a required field."],
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "This is a required field."],
      default: 0,
    },

    image: {
      type: String,
      required: false,
      default: "",
    },
  },
  // this is the created and updated at time
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", ProductSchema);