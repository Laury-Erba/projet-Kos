import { pool } from "../server.js";

// Fonction pour obtenir les informations d'un utilisateur client
export const getClientUser = async (req, res) => {
  const { id, Role } = req.user; // On récupère les infos de l'utilisateur à partir du token

  // Vérifie si l'utilisateur est bien un client
  if (Role !== "client") {
    return res
      .status(403)
      .json({ message: "Accès refusé : réservés aux clients." });
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT Nom, Prenom, Email FROM Users WHERE ID_utilisateur = ?",
      [id]
    );
    connection.release();

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        Nom: user.Nom,
        Prenom: user.Prenom,
        Email: user.Email,
        Role: user.Role,
      });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé." });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations utilisateur :",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des informations utilisateur.",
    });
  }
};
