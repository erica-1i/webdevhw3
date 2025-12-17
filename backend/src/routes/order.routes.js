import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

async function getOrCreateCart() {
  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });
  return cart;
}

// POST /api/orders/place  -> saves current cart as an order, clears cart
router.post("/place", async (req, res) => {
  const cart = await getOrCreateCart();
  if (cart.items.length === 0) return res.status(400).json({ error: "Cart is empty" });

  const total = cart.items.reduce((s, it) => s + it.price * it.qty, 0);

  const order = await Order.create({
    items: cart.items.map((it) => ({
      menuItemId: it.menuItemId,
      name: it.name,
      price: it.price,
      qty: it.qty
    })),
    total,
    status: "placed"
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

// GET /api/orders  (view order history)
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
