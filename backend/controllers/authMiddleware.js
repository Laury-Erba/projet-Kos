// backend/controllers/authMiddleware.js
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { pool } from "../server.js"; // Assurez-vous que le pool est importé correctement

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

export const authorizeAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT role FROM Users WHERE ID = ?",
      [req.user.id]
    );
    connection.release();

    if (rows.length > 0 && rows[0].role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    console.error("Error authorizing admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};
