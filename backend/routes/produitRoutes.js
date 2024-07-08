import express from "express";
import { getProducts } from "../controllers/produitsController.js";

const router = express.Router();

// Route pour récupérer tous les produits
router.get("/", getProducts);

export default router;
