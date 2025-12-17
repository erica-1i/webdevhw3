import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    name: String,
    price: Number,
    qty: { type: Number, default: 1 }
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    // simple version: one cart (or per user if you add auth later)
    items: { type: [CartItemSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
