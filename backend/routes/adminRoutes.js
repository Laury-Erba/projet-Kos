import express from "express";
import { updateUserRole } from "../controllers/adminController.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../controllers/authMiddleware.js";

const router = express.Router();

router.put("/role/:id", authenticateToken, authorizeAdmin, updateUserRole);

export default router;
