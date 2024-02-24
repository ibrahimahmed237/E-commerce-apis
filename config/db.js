import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

export default asyncHandler(async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
});
