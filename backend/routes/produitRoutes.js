import express from "express";
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

const router = express.Router();

router.get("/", getProducts); // Accessible à tous
router.get("/:id", getProductById); // Accessible à tous
router.post("/", authenticateToken, authorizeAdmin, addProduct); // Protégé
router.put("/:id", authenticateToken, authorizeAdmin, updateProduct); // Protégé
router.delete("/:id", authenticateToken, authorizeAdmin, deleteProduct); // Protégé

export default router;
