// backend/routes/adminRoutes.js
import express from "express";
import { updateUserRole } from "../controllers/adminController.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../controllers/authMiddleware.js";

const router = express.Router();

router.put("/user/role", authenticateToken, authorizeAdmin, updateUserRole);

export default router;
