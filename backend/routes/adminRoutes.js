import express from "express";
import { authenticateToken } from "../controllers/authMiddleware.js";

const router = express.Router();

router.get("/user", authenticateToken, (req, res) => {
  res.json(req.user);
});

export default router;
