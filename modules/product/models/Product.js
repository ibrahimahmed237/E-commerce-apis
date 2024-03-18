import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);