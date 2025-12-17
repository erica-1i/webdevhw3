import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    name: String,
    price: Number,
    qty: Number
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    status: { type: String, default: "placed" } // placed, preparing, completed, cancelled
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
