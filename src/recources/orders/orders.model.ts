import mongoose from "mongoose";
import IOrder from "./orders.types";

const OrdersSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  quantities: {
    type: Number,
    required: true,
    min: 1,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IOrder>("Orders", OrdersSchema);
