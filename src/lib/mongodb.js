import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("Using existing database connection");
    return cached.conn;
  }
  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose;
      })
      .catch((error) => {
        console.log("MongoDB connection error", error);
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
