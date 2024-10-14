import jwt from "jsonwebtoken";
import { pool } from "../server.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Accès refusé" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = user;
    next();
  });
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    console.log("Utilisateur non authentifié");
    return res.status(401).json({ message: "Non autorisé" });
  }

  console.log("Vérification du rôle de l'utilisateur :", req.user.Role);

  if (req.user.Role !== "admin") {
    console.log("Accès refusé. Rôle actuel :", req.user.Role);
    return res
      .status(403)
      .json({ message: "Accès refusé : administrateurs uniquement" });
  }

  console.log("Accès autorisé pour l'utilisateur admin.");
  next();
};
