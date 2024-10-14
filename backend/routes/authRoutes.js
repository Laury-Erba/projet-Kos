import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authenticateToken } from "../controllers/authMiddleware.js"; // Middleware pour authentifier le token
import { getClientUser } from "../controllers/clientController.js"; // Nouveau contrôleur pour récupérer les infos client

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Route pour obtenir les infos du client connecté
router.get("/client/user", authenticateToken, getClientUser); // Route protégée par le middleware `authenticateToken`

export default router;
