// src/config/index.ts
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/agritech";

// Allowed frontend origins (dev)
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174"
];

export default {
  PORT,
  MONGO_URI,
  ALLOWED_ORIGINS
};
