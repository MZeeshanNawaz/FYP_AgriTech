import { Router } from "express";
import {
  getProductsHandler,
  createProductHandler,
  deleteProductHandler,
} from "../controllers/marketplaceController";

const router = Router();

router.get("/", getProductsHandler);
router.post("/", createProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
