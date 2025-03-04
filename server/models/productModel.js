import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Product is required!"],
    unique: [true, "name has been taken!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
  description: {
    type: String,
    required: [true, "Description Product is required!"],
  },
  image: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: [true, "Category Product is required!"],
    enum: ["sepatu", "kemeja", "baju", "celana", "jaket"],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
