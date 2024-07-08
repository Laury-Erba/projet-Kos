import { pool } from "../server.js";

// Récupérer tous les produits
const getProducts = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM produits");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits : ", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des produits.",
    });
  }
};

export { getProducts };
