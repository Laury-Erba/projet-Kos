// backend/controllers/adminController.js
import mysql from "mysql2/promise";
import { pool } from "../server.js";

// Fonction pour obtenir les informations de l'utilisateur admin
export const getAdminUser = async (req, res) => {
  const { id } = req.user; // Assurez-vous que req.user contient les informations de l'utilisateur

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM Users WHERE ID = ?", [
      id,
    ]);
    connection.release();

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé." });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur admin :",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'utilisateur admin.",
    });
  }
};

// Mettre à jour le rôle d'un utilisateur
export const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE Users SET role = ? WHERE ID = ?",
      [role, userId]
    );
    connection.release();

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Role mis à jour avec succès." });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la mise à jour du rôle." });
  }
};
