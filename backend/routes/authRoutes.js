import express from "express";
import {
  registerClient,
  loginClient,
  loginAdmin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerClient);
router.post("/login", loginClient);
router.post("/admin/login", loginAdmin);

export default router;
