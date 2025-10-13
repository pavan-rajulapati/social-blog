import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { redis } from "./config/redis.js";

dotenv.config();
connectDB()

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

app.get("/test-redis", async (req, res) => {
  try {
    // Set a key-value pair
    await redis.set("foo", "bar");

    // Get the value back
    const value = await redis.get("foo");

    res.json({ message: "Redis working fine!", value });
  } catch (error) {
    console.error("Redis Error:", error);
    res.status(500).json({ error: "Redis test failed" });
  }
});

export default app;