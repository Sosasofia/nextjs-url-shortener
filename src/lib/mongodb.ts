import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI env variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { connection: null, promise: null };
}

export async function connectMongoDB() {
  if (cached.connection && mongoose.connection.readyState !== 1) {
    console.log("Clearing hung Mongoose connection...");
    cached.connection = null;
    cached.promise = null;
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGO_URI as string, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  try {
    cached.connection = await cached.promise;
    console.log("Connected to MongoDB via Mongoose.");
  } catch (e) {
    cached.promise = undefined;
    console.error("CRITICAL MONGODB CONNECTION ERROR:", e);
    throw e;
  }

  return cached.connection;
}

export const clientPromise: Promise<MongoClient> = connectMongoDB().then(
  (mongooseInstance) => {
    return mongooseInstance.connection.getClient() as unknown as MongoClient;
  },
);
