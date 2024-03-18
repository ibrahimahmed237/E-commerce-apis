import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
});

export default mongoose.model("Category", categorySchema);