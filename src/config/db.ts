import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  // Accept multiple possible env names to be resilient to .env typos/variants
  const rawUri =
    process.env.MONGO_URI ?? process.env.MONGO_URL ?? process.env.MONGO;
  const uri = rawUri?.toString().trim();

  if (!uri) {
    console.warn(
      "MongoDB URI not set in environment. Provide MONGO_URI or MONGO_URL. Skipping MongoDB connection."
    );
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // do not exit process here; let calling code decide
  }
};

export default connectDB;
