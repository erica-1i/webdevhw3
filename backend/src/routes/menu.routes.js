import express from "express";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

// GET /api/menu
router.get("/", async (req, res) => {
  const items = await MenuItem.find().sort({ name: 1 });
  res.json(items);
});

// (Optional admin) POST /api/menu
router.post("/", async (req, res) => {
  const created = await MenuItem.create(req.body);
  res.status(201).json(created);
});

export default router;
