import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";

import { products } from "./recources/products";
import { orders } from "./recources/orders";
import { errorHandler } from "./middlewares/errors";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

connectDB();

app.use("/products", products);
app.use("/orders", orders);
app.use(errorHandler);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello from Server!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
