import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

const cached: {
  connection?: typeof mongoose;
  promise?: Promise<typeof mongoose>;
} = {};

async function connectMongoDB() {
  if (!MONGO_URI) {
    throw new Error("Please define the MONGODB_URI env variable");
  }
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
    console.log("Connected to MongoDB");
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return cached.connection;
}

export default connectMongoDB;
