import mongoose from 'mongoose';
import IOrder from './orders.types';

export interface OrderDocument extends IOrder, mongoose.Document {}
const OrdersSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
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

export default mongoose.model<OrderDocument>('Orders', OrdersSchema);
