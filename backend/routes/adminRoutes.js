import express from "express";
import { getAdminUser } from "../controllers/adminController.js";
// Vérifie que tu importes la bonne fonction
import { getUsers, updateUserRole } from "../controllers/userController.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../controllers/authMiddleware.js"; // Les middlewares pour l'authentification

const router = express.Router();

router.get("/user", authenticateToken, authorizeAdmin, getAdminUser); // Utilisation du middleware et de la fonction contrôleur
// Route pour récupérer tous les utilisateurs
router.get("/users", authenticateToken, authorizeAdmin, getUsers); // Note le pluriel "users" ici

// Route pour mettre à jour le rôle d'un utilisateur
router.put("/users/:id", authenticateToken, authorizeAdmin, updateUserRole);
export default router;
