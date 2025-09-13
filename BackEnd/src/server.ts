// src/server.ts
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { connectDB } from "./databases/mongo";
import marketplaceRoutes from "./routes/marketplaceRoutes";
import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFound";

const app: Application = express();

// CORS: allow the frontend dev origins
app.use(
  cors({
    origin: config.ALLOWED_ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// basic health
app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

// api
app.use("/api/products", marketplaceRoutes);

// 404
app.use(notFoundHandler);

// central error handler
app.use(errorHandler);

// start
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
