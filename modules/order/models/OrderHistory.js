import mongoose from "mongoose";

const OrderHistorySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    oldStatus: {
      type: String,
      enum: ["placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      required: true,
    },
    newStatus: {
      type: String,
      enum: ["placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      required: true,
    },
  },
  { timestamps: true }
);

export default  mongoose.model("OrderHistory", OrderHistorySchema);