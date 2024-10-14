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

// Vérifie si l'utilisateur est un admin
export const authorizeAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT Role FROM Users WHERE ID = ?",
      [req.user.id]
    );
    connection.release();

    if (rows.length > 0 && rows[0].Role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Accès refusé, réservé aux admins." });
    }
  } catch (error) {
    console.error("Erreur lors de l'autorisation admin :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
