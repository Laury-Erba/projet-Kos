import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 8889,
  password: "root",
  database: "Kos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Récupérer tous les produits
export const getProducts = async (req, res) => {
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
