import { Request, Response, NextFunction } from "express";
import {
  getProductsService,
  createProductService,
  deleteProductService,
} from "../services/marketplaceService";

export async function getProductsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await getProductsService();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function createProductHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await createProductService(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function deleteProductHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await deleteProductService(id);
    res.json({ ok: true, id });
  } catch (err) {
    next(err);
  }
}
