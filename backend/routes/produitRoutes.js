// produitRoutes.js
import express from "express";
import { upload } from "../upload.js";
const router = express.Router();
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/produitsController.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../controllers/authMiddleware.js";

router.get("/", getProducts); // Accessible à tous
router.get("/:id", getProductById); // Accessible à tous

// Pour ajouter un produit (protégé par authentification et autorisation admin)
router.post(
  "/",
  authenticateToken,
  authorizeAdmin,
  upload.single("image"), // Utilisation de 'upload' importé de server.js
  addProduct
);

// Pour mettre à jour un produit (protégé par authentification et autorisation admin)
router.put(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  upload.single("image"), // Utilisation de 'upload' importé de server.js
  updateProduct
);

// Pour supprimer un produit (protégé par authentification et autorisation admin)
router.delete("/:id", authenticateToken, authorizeAdmin, deleteProduct);

export default router;
