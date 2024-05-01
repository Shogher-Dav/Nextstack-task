import mongoose from "mongoose";

export default function connectDB() {
  const url = process.env.MONGODB_URL || "";
  try {
    mongoose.connect(url);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
}
