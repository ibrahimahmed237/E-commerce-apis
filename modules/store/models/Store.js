import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  logo: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Store", storeSchema);
