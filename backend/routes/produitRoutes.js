import express from "express";
const router = express.Router();

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/produitsController.js";

router.get("/produits", getProducts);

//router.post("/produits", addProduct);
//router.put("/produits/:id", updateProduct);
//router.delete("/produits/:id", deleteProduct);

export default router;
