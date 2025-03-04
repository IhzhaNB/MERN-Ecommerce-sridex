import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((err) => {
      console.error("Mongodb Connection error:", err);
      process.exit(1);
    });
};

export default connectDB;
