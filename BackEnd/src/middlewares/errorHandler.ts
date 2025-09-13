import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error("Error:", err?.message || err);
  const status = err?.status || (err?.name === "ValidationError" ? 400 : 500);
  res.status(status).json({
    error: err?.message || "Internal Server Error",
  });
}
