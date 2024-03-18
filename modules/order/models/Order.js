import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: [
        "Order Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    payment: {
      status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        required: true,
      },
      method: {
        type: String,
        enum: ["Cash on Delivery", "Card", "Net Banking"],
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);