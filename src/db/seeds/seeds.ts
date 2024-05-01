import mongoose from "mongoose";
import productsModel from "../../recources/products/products.model";
import ordersModel from "../../recources/orders/orders.model";
import "dotenv/config";

const url = process.env.MONGODB_URL || "";

mongoose
  .connect(url, {})
  .then(() => {
    console.log("Mongo Connection open");
  })
  .catch((err) => {
    console.log(err);
  });

const seedProducts = [
  {
    _id: "6630feecb09f8e53e59f85b4",
    name: "product1",
    description: "product des",
    price: 10,
    stock: 10,
  },
  {
    _id: "6630feecb09f8e53e59f85b5",
    name: "product2",
    description: "product des",
    price: 5,
    stock: 50,
  },
  {
    _id: "6630feecb09f8e53e59f85b6",
    name: "product2",
    description: "product des",
    price: 5,
    stock: 30,
  },
  {
    _id: "6630feecb09f8e53e59f85b7",
    name: "product2",
    description: "product des",
    price: 7,
    stock: 60,
  },
  {
    _id: "6630feecb09f8e53e59f85b8",
    name: "product2",
    description: "product des",
    price: 15,
    stock: 30,
  },
  {
    _id: "6630feecb09f8e53e59f85b9",
    name: "product2",
    description: "product des",
    price: 5,
    stock: 70,
  },
];

const seedOrders = [
  {
    product_id: "6630feecb09f8e53e59f85b4",
    quantities: 2,
    total_price: 20,
  },
  {
    product_id: "6630feecb09f8e53e59f85b5",
    quantities: 2,
    total_price: 10,
  },
];

const seedDB = async () => {
  await productsModel.deleteMany({});
  await productsModel.insertMany(seedProducts);
  await ordersModel.deleteMany({});
  await ordersModel.insertMany(seedOrders);
};

seedDB().then(() => {
  mongoose.connection.close();
});
