import { pool } from "../server.js";

export const getUsers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT ID_utilisateur, Nom, Prenom, Role FROM Users"
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des utilisateurs.",
    });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { Role } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "UPDATE Users SET Role = ? WHERE ID_utilisateur = ?",
      [Role, id]
    );
    connection.release();
    res
      .status(200)
      .json({ message: "Rôle utilisateur mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle utilisateur :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du rôle utilisateur.",
    });
  }
};
