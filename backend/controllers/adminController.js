import { pool } from "../server.js";

// Route pour récupérer les informations d'un utilisateur admin
app.get("/api/admin/user", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const [user] = await pool.query("SELECT * FROM Users WHERE ID = ?", [
      userId,
    ]);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (user.Role !== "admin") {
      return res
        .status(403)
        .json({ message: "Accès refusé : vous n'êtes pas administrateur" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Erreur lors de la récupération des données admin :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Mettre à jour le rôle d'un utilisateur
export const updateUserRole = async (req, res) => {
  const { userId, Role } = req.body;

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
