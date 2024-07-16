import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/produitsController.js";

const router = express.Router();

router.get("/produits", getProducts);
router.post("/produits", addProduct);
router.put("/produits/:id", updateProduct);
router.delete("/produits/:id", deleteProduct);

export default router;
