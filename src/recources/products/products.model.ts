import mongoose from "mongoose";
import IProduct from "./products.types";

export interface ProductDocument extends IProduct, mongoose.Document {}

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    max: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<ProductDocument>("Products", ProductsSchema);
