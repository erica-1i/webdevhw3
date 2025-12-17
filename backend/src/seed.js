import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "./models/MenuItem.js";

dotenv.config();

const seed = [
  { name: "Caffè Latte", price: 4.25, description: "Rich espresso with steamed milk.", imageKey: "drink2.jpg" },
  { name: "Caramel Macchiato", price: 5.25, description: "Vanilla, espresso, milk, caramel drizzle.", imageKey: "drink3.jpg" },
  { name: "Cold Brew", price: 4.75, description: "Slow-steeped, super smooth.", imageKey: "drink4.jpg" },
  { name: "Matcha Latte", price: 5.00, description: "Stone-ground matcha with milk.", imageKey: "drink5.jpg" },
  { name: "Butter Croissant", price: 3.25, description: "Flaky, buttery goodness.", imageKey: "drink6.jpg" },
  { name: "Blueberry Muffin", price: 3.75, description: "Studded with juicy berries.", imageKey: "drink1.jpg" }
];

await mongoose.connect(process.env.MONGODB_URI);
await MenuItem.deleteMany({});
await MenuItem.insertMany(seed);
console.log("✅ Seeded menu items");
await mongoose.disconnect();
