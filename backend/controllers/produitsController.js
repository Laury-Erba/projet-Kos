import mysql from "mysql2/promise";
import path from "path";

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

// Ajouter un produit
export const addProduct = async (req, res) => {
  const { Nom, Description, Prix, Stock } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO Produits (Nom, Description, Prix, Stock, image) VALUES (?, ?, ?, ?, ?)",
      [Nom, Description, Prix, Stock, image]
    );
    connection.release();
    res.status(201).json({ message: "Produit ajouté avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit : ", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de l'ajout du produit." });
  }
};
