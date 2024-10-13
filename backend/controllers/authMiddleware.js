import jwt from "jsonwebtoken";
import { pool } from "../server.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Vérifie si l'utilisateur est un admin
export const authorizeAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT role FROM Users WHERE ID_utilisateur = ?",
      [req.user.ID_utilisateur]
    );
    connection.release();

    if (rows.length > 0 && rows[0].role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied, admin only." });
    }
  } catch (error) {
    console.error("Error authorizing admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};
