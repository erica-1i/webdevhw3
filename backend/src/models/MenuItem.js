import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    imageKey: { type: String, default: "" } // e.g., "drink1.jpg"
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", MenuItemSchema);
