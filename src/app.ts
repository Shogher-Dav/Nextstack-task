import express, { Express, Request, Response, json } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db";

import { products } from "./recources/products";
import { orders } from "./recources/orders";
import { errorHandler } from "./middlewares/errors";
import { user } from "./recources/users";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(json());
app.use(cookieParser());
app.use(cors());

connectDB();

app.use("/products", products);
app.use("/orders", orders);
app.use("/user", user);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello from Server!");
});
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
