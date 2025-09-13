import { Request, Response } from "express";

export default function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ message: "Not Found" });
}
