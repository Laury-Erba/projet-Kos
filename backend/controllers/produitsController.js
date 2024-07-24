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
    const [rows] = await connection.query("SELECT * FROM Produits");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits : ", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des produits.",
    });
  }
};

// Récupérer un produit par ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM produits WHERE ID_produit = ?",
      [id]
    );
    connection.release();
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Produit non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du produit : ", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération du produit.",
    });
  }
};

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

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { Nom, Description, Prix, Stock } = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      "UPDATE produits SET Nom = ?, Description = ?, Prix = ?, Stock = ?, image = ? WHERE ID_produit = ?",
      [Nom, Description, Prix, Stock, image, id]
    );
    connection.release();
    res.status(200).json({ message: "Produit mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit : ", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la mise à jour du produit." });
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    await connection.query("DELETE FROM produits WHERE ID_produit = ?", [id]);
    connection.release();
    res.status(200).json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit : ", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la suppression du produit." });
  }
};
