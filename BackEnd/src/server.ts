import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { connectDB } from "./databases/mongo";

import marketplaceRoutes from "./routes/marketplaceRoutes";
import authRoutes from "./routes/auth.routes"; 

import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFound";

const app: Application = express();

// ================= CORS =================
app.use(
  cors({
    origin: config.ALLOWED_ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ================= HEALTH CHECK =================
app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

// ================= ROUTES =================
app.use("/api/auth", authRoutes);          
app.use("/api/products", marketplaceRoutes); 

// ================= 404 =================
app.use(notFoundHandler);

// ================= ERROR HANDLER =================
app.use(errorHandler);

// ================= START SERVER =================
async function start() {
  try {
    await connectDB(config.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(config.PORT, () => {
      console.log(`Server running on http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
}

start();
