import { pool } from "../server.js";

export const getAdminUser = async (req, res) => {
  const { id } = req.user; // Assurez-vous que req.user contient l'ID utilisateur
  console.log("ID utilisateur récupéré pour admin:", id); // Vérifie l'ID utilisateur

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM Users WHERE ID_utilisateur = ?",
      [id]
    );
    console.log("Résultat SQL:", rows); // Ajoute un log pour voir le résultat de la requête SQL
    connection.release();

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        user: {
          Role: user.Role,
          Email: user.Email,
          Nom: user.Nom,
          Prenom: user.Prenom,
        },
      });
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
  const { Role } = req.body; // Le nouveau rôle est envoyé dans le body de la requête
  const userId = req.params.id; // L'ID de l'utilisateur est envoyé dans l'URL

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE Users SET Role = ? WHERE ID = ?",
      [Role, userId]
    );
    connection.release();

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Rôle mis à jour avec succès." });
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
