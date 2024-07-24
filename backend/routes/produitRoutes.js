import express from "express";
import multer from "multer";
import path from "path";
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

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", getProducts); // Accessible à tous
router.get("/:id", getProductById); // Accessible à tous
router.post(
  "/",
  authenticateToken,
  authorizeAdmin,
  upload.single("image"),
  addProduct
); // Protégé
router.put(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  upload.single("image"),
  updateProduct
); // Protégé
router.delete("/:id", authenticateToken, authorizeAdmin, deleteProduct); // Protégé

export default router;
