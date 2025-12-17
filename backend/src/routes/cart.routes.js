import express from "express";
import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

async function getOrCreateCart() {
  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });
  return cart;
}

// GET /api/cart
router.get("/", async (req, res) => {
  const cart = await getOrCreateCart();
  res.json(cart);
});

// POST /api/cart/add  { menuItemId }
router.post("/add", async (req, res) => {
  const { menuItemId } = req.body;
  const item = await MenuItem.findById(menuItemId);
  if (!item) return res.status(404).json({ error: "Menu item not found" });

  const cart = await getOrCreateCart();
  const idx = cart.items.findIndex((x) => String(x.menuItemId) === String(menuItemId));

  if (idx >= 0) cart.items[idx].qty += 1;
  else cart.items.push({ menuItemId, name: item.name, price: item.price, qty: 1 });

  await cart.save();
  res.json(cart);
});

// POST /api/cart/inc  { menuItemId }
router.post("/inc", async (req, res) => {
  const { menuItemId } = req.body;
  const cart = await getOrCreateCart();
  const idx = cart.items.findIndex((x) => String(x.menuItemId) === String(menuItemId));
  if (idx >= 0) cart.items[idx].qty += 1;
  await cart.save();
  res.json(cart);
});

// POST /api/cart/dec  { menuItemId }
router.post("/dec", async (req, res) => {
  const { menuItemId } = req.body;
  const cart = await getOrCreateCart();
  const idx = cart.items.findIndex((x) => String(x.menuItemId) === String(menuItemId));
  if (idx >= 0) {
    cart.items[idx].qty -= 1;
    if (cart.items[idx].qty <= 0) cart.items.splice(idx, 1);
  }
  await cart.save();
  res.json(cart);
});

// POST /api/cart/remove { menuItemId }
router.post("/remove", async (req, res) => {
  const { menuItemId } = req.body;
  const cart = await getOrCreateCart();
  cart.items = cart.items.filter((x) => String(x.menuItemId) !== String(menuItemId));
  await cart.save();
  res.json(cart);
});

// POST /api/cart/clear
router.post("/clear", async (req, res) => {
  const cart = await getOrCreateCart();
  cart.items = [];
  await cart.save();
  res.json(cart);
});

export default router;
